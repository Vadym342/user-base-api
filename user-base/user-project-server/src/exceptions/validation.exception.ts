import { BadRequestException } from '@nestjs/common';

import { ExceptionError } from './types/exception';

export class ValidationException extends BadRequestException {
  readonly errors: ExceptionError[];

  constructor(error: ExceptionError | ExceptionError[]) {
    super(ValidationException.name);

    this.errors = Array.isArray(error) ? error : [error];
  }
}
