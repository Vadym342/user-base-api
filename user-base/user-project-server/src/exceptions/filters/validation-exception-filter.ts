import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

import { Exception } from '@src/exceptions/types/exception';

import { ValidationException } from '../validation.exception';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(exception: ValidationException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const customException: Exception = {
      name: ValidationException.name,
      statusCode: exception.getStatus(),
      errors: exception.errors,
    };

    this.logger.error(customException);

    response.status(HttpStatus.BAD_REQUEST).json(customException);
  }
}
