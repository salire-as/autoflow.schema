import { Application, RequestOperation } from "../../application";
import { executeMiddleware } from "../middleware";
import axios, { AxiosError } from "axios";
import { defaults } from "lodash";
import { cleanResponse } from "../cleanResponse";

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

  constructor(app: Application) {
    this.app = app;
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

  /**
   *
   * A promise based HTTP client that gives you full control over the request and response.
   */
  public async request(options: RequestOperation) {
    try {
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
          this
        );
      }

      const response = await axios(possiblyMutatedOptions);

      this.httpRequests.push({
        ...cleanResponse(response),
        request: possiblyMutatedOptions,
        executedAt: new Date(),
      });

      let possiblyMutatedResponse: ResponseObject = response;

      if (!this.isMiddleware) {
        possiblyMutatedResponse = await executeMiddleware(
          this.app.afters,
          cleanResponse(response),
          this
        );
      }

      return possiblyMutatedResponse;
    } catch (err) {
      const response = err as AxiosError;
      return cleanResponse(response);
    }
  }
}
