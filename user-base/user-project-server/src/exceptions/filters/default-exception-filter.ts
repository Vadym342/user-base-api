import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

import { DEFAULT_UNHANDLED_ERROR } from '../constants/unhandled-error-context';
import { Exception } from '../types/exception';

@Catch()
export class DefaultExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DefaultExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const customException: Exception = {
      name: exception.name || 'UnhandledException',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errors: [
        {
          errorCode: DEFAULT_UNHANDLED_ERROR.errorCode,
          message: exception.message || DEFAULT_UNHANDLED_ERROR.message,
        },
      ],
    };

    this.logger.error(customException);

    response.status(customException.statusCode).json(customException);
  }
}
