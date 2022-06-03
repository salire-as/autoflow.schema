import { ResponseObject } from "../f";

export interface Bundle {
  rawRequest?: ResponseObject;
  input?: Record<string, unknown>;
  authData?: unknown;
  subscribeData?: unknown;
  redirectUrl?: string;
  targetUrl?: string;
}
