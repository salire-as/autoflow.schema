import { Operation } from "../operation";

export enum InputOutputType {
  STRING = "string",
  NUMBER = "number",
}

interface Choice {
  label: string;
  value: string;
}

interface InputOutput {
  key: string;
  label: string;
  description: string;
  required?: boolean;
  type: InputOutputType;
  choices?: Choice[];
  default?: string | number;
}

export interface ActionOrTrigger {
  label: string;
  description: string;
  documentation?: string;
  inputs?: Inputs;
  outputs?: Outputs;
  operation: Operation;
}

export type Inputs = InputOutput[];
export type Outputs = InputOutput[];
