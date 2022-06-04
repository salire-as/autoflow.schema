import { RequestOperation } from "../../application/operation";
import { Bundle } from "../bundle";
import { F } from "../f";

export const includeBearerToken = (
  request: RequestOperation,
  f: F,
  bundle: Bundle
) => {
  const authData = bundle.authData as Record<string, string>;
  if (authData && authData.access_token && request.headers) {
    request.headers["Authorization"] = `Bearer ${authData.access_token}`;
  }
  return request;
};
