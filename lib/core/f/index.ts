import { Application, RequestOperation } from "../../application";
import { executeMiddleware } from "../middleware";
import axios from "axios";
import { defaults } from "lodash";
import { cleanResponse } from "../cleanResponse";
export interface ResponseObject {
  data: unknown;
  status: number;
  statusText: string;
  request: RequestOperation;
}

export class F {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async request(options: RequestOperation) {
    const possiblyMutatedOptions = await executeMiddleware(
      this.app.befores,
      defaults<RequestOperation, Partial<RequestOperation>>(options, {
        headers: {},
        params: {},
        query: {},
        data: null,
      }),
      this
    );

    const response = await axios(possiblyMutatedOptions);

    const possiblyMutatedResponse = await executeMiddleware(
      this.app.afters,
      cleanResponse(response),
      this
    );

    return possiblyMutatedResponse;
  }
}
