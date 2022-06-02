import { get, isFunction, isObject } from "lodash";
import {
  Application,
  RequestOperation,
  RequestFunction,
} from "../../application";
import { ExecutionEvent } from "../event";
import { F } from "../f";
import { prepareApp } from "../prepareApp";

export const execute = async (rawApp: Application, event: ExecutionEvent) => {
  const app = prepareApp(rawApp);

  const method = get(app, event.method) as RequestOperation | RequestFunction;

  const f = new F(app);

  if (isFunction(method)) {
    return method(f, event.bundle);
  } else if (isObject(method) && method.url) {
    return f.request(method);
  } else {
    throw new Error(`Error: Could not find app method ${event.method} to call`);
  }
};
