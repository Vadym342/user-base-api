import { HttpStatus } from '@nestjs/common';

import { HttpException } from './http.exception';
import { ExceptionError } from './types/exception';

export class ConflictException extends HttpException {
  readonly name = ConflictException.name;

  constructor({ message, errorCode }: ExceptionError) {
    super(HttpStatus.CONFLICT, message, errorCode);
  }
}
