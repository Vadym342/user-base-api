import { HttpStatus } from '@nestjs/common';

import { HttpException } from './http.exception';
import { ExceptionError } from './types/exception';

export class ForbiddenException extends HttpException {
  readonly name = ForbiddenException.name;

  constructor({ message, errorCode }: ExceptionError) {
    super(HttpStatus.FORBIDDEN, message, errorCode);
  }
}
