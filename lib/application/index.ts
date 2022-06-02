import { Actions } from "./action";
import { Authentication } from "./authentication";
import { Triggers } from "./trigger";

export interface Application {
  name: string;
  description: string;
  version: string;
  authentication?: Authentication;
  triggers?: Triggers;
  actions?: Actions;
}

export * from "./action";
export * from "./authentication";
export * from "./common";
export * from "./operation";
export * from "./trigger";
