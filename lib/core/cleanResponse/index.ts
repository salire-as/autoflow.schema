import { AxiosResponse, AxiosError } from "axios";
import { ResponseObject } from "../f";

export const cleanResponse = (
  response: AxiosResponse | AxiosError
): ResponseObject => {
  if (response instanceof Error) {
    const json = response.toJSON() as any;
    return {
      data: response.response?.data,
      status: json.status,
      statusText: json.code,
      request: json.config,
    };
  } else
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      request: response.config as any,
    };
};
