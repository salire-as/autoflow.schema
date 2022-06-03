const createError = (name: string) => {
  return class NewError extends Error {
    constructor(message = "") {
      super(message);

      this.name = name;
      this.message = message;

      Error.call(this);
      Error.captureStackTrace(this, this.constructor);
    }
  };
};

export const REFRESH_AUTHENTICATION_ERROR = createError(
  "REFRESH_AUTHENTICATION_ERROR"
);

export const EXPIRED_AUTHENTICATION_ERROR = createError(
  "EXPIRED_AUTHENTICATION_ERROR"
);
