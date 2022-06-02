import { Application, RequestOperation } from "../../application";
import { executeMiddleware } from "../middleware";
import axios from "axios";
export interface ResponseObject {
  data: unknown;
  status: number;
  statusText: string;
  request: {
    query?: Record<string, unknown>;
    headers?: Record<string, string | number | boolean>;
  };
}

export class F {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async request(options: RequestOperation) {
    const possiblyMutatedOptions = await executeMiddleware(
      this.app.befores,
      options,
      this
    );

    const response = await axios(possiblyMutatedOptions);

    return executeMiddleware(this.app.afters, response, this);
  }
}
