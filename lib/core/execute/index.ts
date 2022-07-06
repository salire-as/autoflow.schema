import { get, isFunction, isObject, isString } from "lodash";
import {
  Application,
  RequestOperation,
  RequestFunction,
} from "../../application";
import { Bundle } from "../bundle";
import { curlies } from "../curlies";
import { ExecutionEvent } from "../event";
import { F, Log, ResponseObject } from "../f";
import { loadEnvs } from "../loadEnvs";
import { prepareApp } from "../prepareApp";

export interface LambdaResponse {
  output: unknown;
  requests: ResponseObject[];
  logs: Log[];
  bundle: Bundle;
  isSuccessful: boolean;
  error?: Error | unknown;
}

export const execute = async (
  rawApp: Application,
  event: ExecutionEvent
): Promise<LambdaResponse> => {
  const app = prepareApp(rawApp);

  const method = get(app, event.method) as
    | RequestOperation
    | RequestFunction
    | string;

  let bundle = event.bundle;

  loadEnvs(bundle.process.env);

  const f = new F(app, bundle);

  /**
   * We need to handle execution errors here so that the logs, bundle etc are still sent
   */
  let isSuccessful = true;
  let output: unknown;
  let error: unknown = null;

  if (isFunction(method)) {
    try {
      output = await method(f, bundle);
    } catch (err) {
      isSuccessful = false;
      error = err;
    }
  } else if (isObject(method) && method.url) {
    try {
      const response = await f.request(method);
      output = response.data;
    } catch (err) {
      isSuccessful = false;
      error = err;
    }
  } else if (isString(method)) {
    try {
      output = curlies(method, { bundle }, true);
    } catch (err) {
      isSuccessful = false;
      error = err;
    }
  } else {
    throw new Error(`Error: Could not find app method ${event.method} to call`);
  }

  return {
    output,
    requests: f.httpRequests,
    logs: f.logs,
    bundle,
    isSuccessful: isSuccessful,
    error,
  };
};
