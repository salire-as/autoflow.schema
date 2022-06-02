import { get, isFunction, isObject } from "lodash";
import { Application, RequestFunction, RequestOperation } from "../application";
import { ExecutionEvent } from "./event";
import { F } from "./f";

export const execute = async (app: Application, event: ExecutionEvent) => {
  const method = get(app, event.method) as RequestOperation | RequestFunction;

  const f = new F();

  if (isFunction(method)) {
    return method(f, event.bundle);
  } else if (isObject(method) && method.url) {
    return f.request(method);
  }
};
