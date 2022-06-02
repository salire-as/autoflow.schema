import { F } from "../../core";
import { RequestOperation } from "../operation";

export type Before = (
  request: RequestOperation,
  f: F
) => RequestOperation | Promise<RequestOperation>;
