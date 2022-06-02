import { Bundle } from "../../core/bundle";
import { F } from "../../core/f";

export enum REQUEST_METHOD {
  POST = "POST",
  PUT = "PUT",
  GET = "GET",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export type OperationMethod = "run" | "runSubscribe" | "runUnsubscribe";

export interface RequestOperation {
  method: REQUEST_METHOD;
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  query?: Record<string, string>;
  data?: unknown;
}

export type RequestFunction = (f: F, bundle: Bundle) => unknown;

export interface Operation {
  run: RequestOperation | RequestFunction;
  runSubscribe?: RequestOperation | RequestFunction;
  runUnsubscribe?: RequestOperation | RequestFunction;
}
