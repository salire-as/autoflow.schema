import handlebars from "handlebars";
import { isString } from "lodash";
import { RequestOperation } from "../../application";
import { Bundle } from "../bundle";

export const curlies = (
  input: Record<string, unknown> | RequestOperation | string,
  replacements: Record<string, unknown> | Bundle
) => {
  const template = handlebars.compile(
    isString(input) ? input : JSON.stringify(input)
  );

  const output = template(replacements);

  return isString(input) ? output : JSON.parse(output);
};
