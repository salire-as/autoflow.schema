import { ResponseObject } from "..";
import { REFRESH_AUTHENTICATION_ERROR } from "../errors";

export const throwForAuthError = (response: ResponseObject) => {
  if (response.status === 401) {
    throw new REFRESH_AUTHENTICATION_ERROR();
  }
  return response;
};
