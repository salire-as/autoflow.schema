import { Actions } from "./action";
import { After } from "./after";
import { Authentication } from "./authentication";
import { Before } from "./before";
import { Triggers } from "./trigger";

export interface Application {
  name: string;
  description: string;
  version: string;

  authentication?: Authentication;

  triggers?: Triggers;
  actions?: Actions;

  /**
   * Before middleware functions takes request operation object, and returns a (possibly mutated) request object. Before functions are executed in the order specified in the app schema.
   */
  befores?: Before[];
  /**
   * After middleware functions takes a response object, and returns a (possibly mutated) response object. After functions are executed in the order specified in the app schema.
   */
  afters?: After[];
}

export * from "./action";
export * from "./authentication";
export * from "./common";
export * from "./operation";
export * from "./trigger";
export * from "./after";
export * from "./before";
