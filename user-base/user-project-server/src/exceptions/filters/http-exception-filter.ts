import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';

import { Exception } from '@src/exceptions/types/exception';

import { HttpException } from '../http.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const { name, statusCode, errorCode, message } = exception;
    const customException: Exception = {
      name,
      statusCode,
      errors: [
        {
          errorCode,
          message,
        },
      ],
    };

    this.logger.error(customException);

    response.status(customException.statusCode).json(customException);
  }
}
