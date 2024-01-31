import { HttpStatus } from '@nestjs/common';

import { ExceptionError } from '@src/exceptions/types/exception';

export type TestCase<
  Body extends Record<string, any> = any,
  Params extends Record<string, any> = any,
  Query extends Record<string, any> = any,
> = {
  description: string;
  errors?: Partial<ExceptionError>[];
  statusCode: HttpStatus;
  requestBody?: Body;
  requestParams?: Params;
  requestQuery?: Query;
  responseBody?: Record<string, any>;
} & Record<string, any>;

export type AuthHeadersOptions = {
  customerId: string;
  Authorization: string;
};
