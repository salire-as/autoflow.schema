import { Application, RequestOperation } from "../../application";
import { executeMiddleware } from "../middleware";
import axios, { AxiosError } from "axios";
import { defaults } from "lodash";
import { cleanResponse } from "../cleanResponse";
import { Bundle } from "../bundle";
import { curlies } from "../curlies";
import { RESPONSE_ERROR } from "../errors";

export interface ResponseObject {
  data: unknown;
  status: number;
  statusText: string;
  request?: RequestOperation;
  executedAt?: Date;
}

export interface Log {
  loggedAt: Date;
  value: string;
}

export class F {
  private app: Application;
  private bundle: Bundle;

  constructor(app: Application, bundle: Bundle) {
    this.app = app;
    this.bundle = bundle;
  }

  public output: unknown = null;

  public httpRequests: ResponseObject[] = new Array();

  public isMiddleware = false;

  public logs: Log[] = new Array();

  /**
   * Logs created by your app through the use of the `f.log` method
   */
  public log(value: string) {
    this.logs.push({
      loggedAt: new Date(),
      value,
    });
  }

  private async performRequest(request: RequestOperation) {
    try {
      const response = await axios(request);
      return cleanResponse(response);
    } catch (err) {
      /**
       * TODO: Axios always throws at 400 - 500 status codes. We should throw error here to alert Lambda and to not run the rest of the workflow.
       */
      const response = err as AxiosError;
      return cleanResponse(response);
    }
  }

  /**
   *
   * A promise based HTTP client that gives you full control over the request and response.
   */
  public async request(options: RequestOperation) {
    let possiblyMutatedOptions: RequestOperation = options;

    if (!this.isMiddleware) {
      possiblyMutatedOptions = await executeMiddleware(
        this.app.befores,
        defaults<RequestOperation, Partial<RequestOperation>>(options, {
          headers: {},
          params: {},
          query: {},
          data: null,
        }),
        this,
        this.bundle
      );
    }

    const request = curlies(possiblyMutatedOptions, { bundle: this.bundle });

    const response = await this.performRequest(request);

    this.httpRequests.push({
      ...response,
      request,
      executedAt: new Date(),
    });

    if (response.status > 299) {
      throw new RESPONSE_ERROR(response.statusText, response);
    }

    let possiblyMutatedResponse: ResponseObject = response;

    if (!this.isMiddleware) {
      possiblyMutatedResponse = await executeMiddleware(
        this.app.afters,
        possiblyMutatedResponse,
        this,
        this.bundle
      );
    }

    return possiblyMutatedResponse;
  }
}
