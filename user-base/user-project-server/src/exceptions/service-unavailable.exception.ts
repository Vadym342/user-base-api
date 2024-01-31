import { HttpStatus } from '@nestjs/common';

import { HttpException } from './http.exception';
import { ExceptionError } from './types/exception';

export class ServiceUnavailableException extends HttpException {
  constructor({ message, errorCode }: ExceptionError) {
    super(HttpStatus.SERVICE_UNAVAILABLE, message, errorCode);
  }
}
