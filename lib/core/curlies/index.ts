import handlebars from "handlebars";
import { RequestOperation } from "../../application";
import { Bundle } from "../bundle";

export const curlies = (
  input: Record<string, unknown> | RequestOperation,
  replacements: Record<string, unknown> | Bundle
) => {
  const template = handlebars.compile(JSON.stringify(input));

  const output = template(replacements);

  return JSON.parse(output);
};
