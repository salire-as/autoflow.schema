const createError = (name: string) => {
  return class NewError extends Error {
    context: unknown;

    constructor(message = "", context?: unknown) {
      super(message);

      this.name = name;
      this.message = message;
      this.context = context;

      Error.call(this);
      Error.captureStackTrace(this, this.constructor);
    }
  };
};

export const RESPONSE_ERROR = createError("RESPONSE_ERROR");

export const REFRESH_AUTHENTICATION_ERROR = createError(
  "REFRESH_AUTHENTICATION_ERROR"
);

export const EXPIRED_AUTHENTICATION_ERROR = createError(
  "EXPIRED_AUTHENTICATION_ERROR"
);
