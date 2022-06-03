import { Application, RequestOperation } from "../../application";
import { executeMiddleware } from "../middleware";
import axios from "axios";
import { defaults } from "lodash";
import { cleanResponse } from "../cleanResponse";

export interface ResponseObject {
  data: unknown;
  status: number;
  statusText: string;
  request?: RequestOperation;
  executedAt?: Date;
}

export class F {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public output: unknown = null;

  public httpRequests: ResponseObject[] = new Array();

  public isMiddleware = false;

  async request(options: RequestOperation) {
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
  }
}
