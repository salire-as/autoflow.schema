import {
  After,
  Application,
  AUTHENTICATION_TYPE,
  Before,
} from "../../application";
import { applyMiddleware } from "../middleware";
import { includeBearerToken } from "../middleware/includeBearerToken";
import { throwForAuthError } from "../middleware/throwForAuthError";

export const prepareApp = (app: Application) => {
  const befores: Before[] = [];
  const afters: After[] = [];

  if (
    app.authentication?.type === AUTHENTICATION_TYPE.OAUTH2 &&
    app.authentication.oauth2
  ) {
    befores.push(includeBearerToken);
    app.authentication.oauth2.autoRefresh && afters.push(throwForAuthError);
  }

  app.befores = applyMiddleware(app.befores, befores);
  app.afters = applyMiddleware(app.afters, afters);

  return app;
};
