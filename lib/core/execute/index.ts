import { get, isFunction, isObject } from "lodash";
import {
  Application,
  RequestOperation,
  RequestFunction,
} from "../../application";
import { Bundle } from "../bundle";
import { ExecutionEvent } from "../event";
import { F, Log, ResponseObject } from "../f";
import { loadEnvs } from "../loadEnvs";
import { prepareApp } from "../prepareApp";

export interface LambdaResponse {
  output: unknown;
  requests: ResponseObject[];
  logs: Log[];
  bundle: Bundle;
}

export const execute = async (
  rawApp: Application,
  event: ExecutionEvent
): Promise<LambdaResponse> => {
  const app = prepareApp(rawApp);

  const method = get(app, event.method) as RequestOperation | RequestFunction;

  let bundle = event.bundle;

  loadEnvs(bundle.process.env);

  const f = new F(app, bundle);

  let output: unknown;
  if (isFunction(method)) {
    output = await method(f, bundle);
  } else if (isObject(method) && method.url) {
    /**
     * TODO: method object needs to be parsed for curlies
     */
    const response = await f.request(method);
    output = response.data;
  } else {
    throw new Error(`Error: Could not find app method ${event.method} to call`);
  }

  return {
    output,
    requests: f.httpRequests,
    logs: f.logs,
    bundle,
  };
};
