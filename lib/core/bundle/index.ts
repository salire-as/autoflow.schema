import { ResponseObject } from "../f";

export interface Bundle {
  rawRequest?: ResponseObject;
  input?: Record<string, unknown>;
  auth?: unknown;
}
