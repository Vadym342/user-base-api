import { TypeORMError } from 'typeorm';

import { ExceptionError } from './types/exception';

export class DatabaseException extends TypeORMError {
  readonly errorCode: number;
  readonly databaseError: TypeORMError;

  constructor(error: TypeORMError, { errorCode, message }: ExceptionError) {
    super(message);

    this.errorCode = errorCode;
    this.databaseError = error;
  }
}
