import { After, Application, Before } from "../../application";
import { applyMiddleware } from "../middleware";

export const prepareApp = (app: Application) => {
  const befores: Before[] = [];
  const afters: After[] = [];

  app.befores = applyMiddleware(app.befores, befores);
  app.afters = applyMiddleware(app.afters, afters);

  return app;
};
