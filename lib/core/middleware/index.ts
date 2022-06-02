import { F } from "../f";

export const applyMiddleware = <T>(middleware: T[] | undefined, apply: T[]) => {
  return (Array.isArray(middleware) && apply.concat(middleware)) || apply;
};

export const executeMiddleware = async <
  MiddlewareFunction extends Function,
  Input
>(
  middleware: MiddlewareFunction[] | undefined,
  input: Input,
  f: F
) => {
  let possiblyMutatedInput: Input = input;
  if (!middleware) return input;

  for (const fn of middleware) {
    possiblyMutatedInput = await fn(possiblyMutatedInput, f);
  }

  return possiblyMutatedInput;
};
