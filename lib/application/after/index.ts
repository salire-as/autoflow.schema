import { Bundle, F, ResponseObject } from "../../core";

export type After = (
  response: ResponseObject,
  f: F,
  bundle: Bundle
) => ResponseObject | Promise<ResponseObject>;
