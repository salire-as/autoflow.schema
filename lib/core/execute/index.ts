import { get, isFunction, isObject } from "lodash";
import {
  Application,
  RequestOperation,
  RequestFunction,
} from "../../application";
import { ExecutionEvent } from "../event";
import { F, Log, ResponseObject } from "../f";
import { prepareApp } from "../prepareApp";

export interface LambdaResponse {
  output: unknown;
  requests: ResponseObject[];
  logs: Log[];
}

export const execute = async (
  rawApp: Application,
  event: ExecutionEvent
): Promise<LambdaResponse> => {
  const app = prepareApp(rawApp);

  const method = get(app, event.method) as RequestOperation | RequestFunction;

  const f = new F(app);

  /**
   * TODO:
   * - General error handling should be implemented. Errors and logic for doing retries are performed
   *   in the @salire-aiflow/autoflow.runner to not leak logic into this package.
   */

  let output: unknown;
  if (isFunction(method)) {
    output = await method(f, event.bundle);
  } else if (isObject(method) && method.url) {
    const response = await f.request(method);
    output = response.data;
  } else {
    throw new Error(`Error: Could not find app method ${event.method} to call`);
  }

  return {
    output,
    requests: f.httpRequests,
    logs: f.logs,
  };
};
