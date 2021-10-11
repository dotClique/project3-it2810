import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { APIResponse } from "../../../project3-common/src/types";

export type StylesType = {
  [key: string]: SxProps<Theme>;
};

export type APIRequestMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type FetchResponse<ResponseType> = {
  status: number;
  data: APIResponse<ResponseType>;
  headers: Headers;
};
