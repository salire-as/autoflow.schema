import { F, ResponseObject } from "../../core";

export type After = (
  response: ResponseObject,
  f: F
) => ResponseObject | Promise<ResponseObject>;
