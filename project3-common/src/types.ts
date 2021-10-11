export type HelloAPI = {
  message: string;
};

export type ErrorResponse = {
  statusCode: number;
  message: string;
};

export type APIResponse<Data> = Data;
