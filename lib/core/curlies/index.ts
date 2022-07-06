import handlebars from "handlebars";
import { isString } from "lodash";
import { RequestOperation } from "../../application";
import { Bundle } from "../bundle";

export const curlies = <
  T extends Record<string, unknown> | RequestOperation | string
>(
  input: T,
  replacements: Record<string, unknown> | Bundle,
  initialValueAsString: boolean = false
): T => {
  const template = handlebars.compile(
    isString(input) ? input : JSON.stringify(input)
  );

  const output = template(replacements);

  if (output.match(/({)?{{[^{}]*}}(?!})/g))
    return curlies(output, replacements, initialValueAsString) as T;
  else if (initialValueAsString) {
    return output as T;
  } else return JSON.parse(output) as T;
};
