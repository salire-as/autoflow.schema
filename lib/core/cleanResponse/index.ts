import { AxiosResponse, AxiosError } from "axios";
import { ResponseObject } from "../f";

export const cleanResponse = (
  response: AxiosResponse | AxiosError
): ResponseObject => {
  console.log(response);
  if (response instanceof Error) {
    return {
      data: response.response?.data,
      status: response.response?.status || 400,
      statusText: response?.code || "",
      request: {
        method: response?.request?.method,
        url: response?.request?.url,
        headers: response?.request?.headers,
        query: response?.request?.query,
        params: response?.request?.params,
      },
    };
  } else
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      request: {
        method: response?.request?.method,
        url: response?.request?.url,
        headers: response?.request?.headers,
        query: response?.request?.query,
        params: response?.request?.params,
      },
    };
};
