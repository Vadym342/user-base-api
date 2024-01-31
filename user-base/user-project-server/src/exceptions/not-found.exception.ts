import { HttpStatus } from '@nestjs/common';

import { HttpException } from './http.exception';
import { ExceptionError } from './types/exception';

export class NotFoundException extends HttpException {
  readonly name = NotFoundException.name;

  constructor({ message, errorCode }: ExceptionError) {
    super(HttpStatus.NOT_FOUND, message, errorCode);
  }
}
