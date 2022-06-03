import { get, isFunction, isObject } from "lodash";
import {
  Application,
  RequestOperation,
  RequestFunction,
} from "../../application";
import { ExecutionEvent } from "../event";
import { F, ResponseObject } from "../f";
import { prepareApp } from "../prepareApp";

export interface LambdaResponse {
  output: unknown;
  requests: ResponseObject[];
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
   * - The method functions should return the response `data` as outputs and not the whole ResponseObject.
   *   This is because the developer might want to change the data that is returned to AutoFlow from the response.
   *   See example in test app.
   *   `f` class should keep track of all the requests that are done in a method and the ResponeObjects that belongs to it,
   *   and add this data to the execution step instead.
   *
   * - Logging should be done with an universal log function, for the developer to see the logs outside of the Lambda.
   *
   * - General error handling should be implemented. Errors and logic for doing retries are performed
   *   in the @salire-aiflow/autoflow.runner to not leak logic into this package.  ------
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
  };
};
