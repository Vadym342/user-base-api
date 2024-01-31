import { HttpStatus } from '@nestjs/common';

import { HttpException } from './http.exception';
import { ExceptionError } from './types/exception';

export class UnauthorizedException extends HttpException {
  readonly name = UnauthorizedException.name;

  constructor({ message, errorCode }: ExceptionError) {
    super(HttpStatus.UNAUTHORIZED, message, errorCode);
  }
}
