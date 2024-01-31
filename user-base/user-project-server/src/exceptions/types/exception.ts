export type Exception = {
  name: string;
  statusCode: number;
  errors: ExceptionError[];
};

export type ExceptionError = {
  errorCode: number;
  message: string;
};
