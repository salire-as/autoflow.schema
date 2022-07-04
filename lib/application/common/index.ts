import { Operation } from "../operation";

export enum InputOutputType {
  STRING = "string",
  NUMBER = "number",
  DYNAMIC = "dynamic",
  DROPDOWN = "dropdown",
}

interface Choice {
  label: string;
  value: string;
}

export enum DROPDOWN_TYPE {
  STATIC = "static",
  DYNAMIC = "dynamic",
}

export enum VISIBILITY {
  IMPORTANT = "important",
  NORMAL = "normal",
  HIDDEN = "hidden",
}

interface DropdownInputOutput {
  type: DROPDOWN_TYPE;
  /** For static dropdowns you need to define a list of values */
  values?: Choice[];
  /** For dynamic dropdowns you need to define the dropdown source, which should be a string */
  source?: string;
}

interface InputOutput {
  key: string;
  label: string;
  description: string;
  required?: boolean;
  type: InputOutputType;
  default?: string | number;
  dropdown?: DropdownInputOutput;
}

export enum OPERATION_METHOD {
  POLLING = "polling",
  WEBHOOK = "webhook",
}

export interface ActionOrTrigger {
  label: string;
  description: string;
  documentation?: string;
  inputs?: Inputs;
  outputs?: Outputs;
  operation: Operation;
  visibility?: VISIBILITY;
  type?: OPERATION_METHOD;
}

export type Inputs = InputOutput[];
export type Outputs = InputOutput[];
