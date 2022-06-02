import { RequestOperation } from "../../application";

export interface FRequest {
  data: unknown;
  status: number;
  statusText: string;
  request: {
    query?: Record<string, unknown>;
    headers?: Record<string, string | number | boolean>;
  };
}

export class F {
  request(options: RequestOperation) {
    console.log(options);
  }
}
