import { RequestFunction, RequestOperation } from "../operation";

export enum AUTHENTICATION_TYPE {
  OAUTH2 = "OAUTH2",
}

interface OAuth2Operation {
  authorizeUrl: RequestOperation | RequestFunction;
  getAccessToken: RequestOperation | RequestFunction;
  refreshAccessToken?: RequestOperation | RequestFunction;
  scope?: string;
  autoRefresh?: boolean;
}

export interface Authentication {
  type: AUTHENTICATION_TYPE;
  /**
   * A test is required to check if authentication is working as it should. What is returned from the `test` method is available
   * in `label`.
   */
  test: RequestOperation | RequestFunction;
  /**
   * Label defines what users see in the list of their authenticated accounts.
   */
  label?: RequestFunction;
  oauth2?: OAuth2Operation;
}
