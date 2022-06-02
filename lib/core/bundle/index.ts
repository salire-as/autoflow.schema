import { FRequest } from "../f";

export interface Bundle {
  rawRequest?: FRequest;
  input?: Record<string, unknown>;
  auth?: unknown;
}
