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
  oauth2?: OAuth2Operation;
}
