import { Bundle, F } from "../../core";
import { RequestOperation } from "../operation";

export type Before = (
  request: RequestOperation,
  f: F,
  bundle: Bundle
) => RequestOperation | Promise<RequestOperation>;
