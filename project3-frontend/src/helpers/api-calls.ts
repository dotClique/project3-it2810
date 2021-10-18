import { User } from ".prisma/client";
import { HelloAPI } from "../../../project3-common/src/types";
import { APIRequestMethods, FetchResponse } from "./types";
import { getEnv } from "./utils";
/**
 * Default fetch implementation.
 * @param urlPath The url to send a request to.
 * @param method The requst method.
 * @param body The request body.
 * @returns A Promise of an APIResponse containing the request data (or an error message if it not ok), headers and status code
 * If the
 */
export const fromAPI = async (
  urlPath: string,
  method: APIRequestMethods,
  body?: unknown,
  headers = {},
): Promise<FetchResponse<unknown>> => {
  const apiUrl = getEnv("REACT_APP_API_URL");
  const res: Response = await fetch(`${apiUrl}${urlPath}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  const apiResponse = { data, headers: res.headers, status: res.status };

  return new Promise<FetchResponse<unknown>>((resolve, reject) => {
    if (res.ok) {
      return resolve(apiResponse);
    }
    return reject(apiResponse);
  });
};

export const getHelloFromAPI = () => {
  return fromAPI("/hello", "GET") as Promise<FetchResponse<HelloAPI>>;
};

export const createUserFromAPI = () => {
  return fromAPI("/user", "POST") as Promise<FetchResponse<User>>;
};

export const getUserFromAPI = () => {
  return fromAPI("/user", "GET") as Promise<FetchResponse<User>>;
};
