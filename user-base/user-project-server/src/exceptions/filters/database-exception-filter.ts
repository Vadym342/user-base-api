import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';
import { TypeORMError } from 'typeorm';

import { DATABASE_ERROR_CONTEXT } from '../constants/database-error-contexts';
import { DatabaseException } from '../database.exception';
import { Exception } from '../types/exception';

@Catch(TypeORMError, DatabaseException)
export class DatabaseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DatabaseExceptionFilter.name);

  catch(exception: TypeORMError | DatabaseException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const isCustom = exception instanceof DatabaseException;

    const { errorCode, message } = DATABASE_ERROR_CONTEXT.DEFAULT_DATABASE_ERROR;

    const customException: Exception = {
      name: 'DatabaseException',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errors: [
        {
          errorCode: isCustom ? exception['errorCode'] : errorCode,
          message: isCustom ? exception.message : message,
        },
      ],
    };

    if (process.env?.NODE_ENV !== 'production') {
      Object.assign(customException.errors[0], {
        pgCode: isCustom ? exception.databaseError['code'] : exception['code'],
        pgMessage: isCustom ? exception.databaseError.message : exception.message,
      });
    }

    const errorTrace = isCustom ? exception.databaseError : exception;

    this.logger.error(errorTrace);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(customException);
  }
}
