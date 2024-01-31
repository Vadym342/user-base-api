import { Logger, ValidationError } from '@nestjs/common';

import { VALIDATION_ERROR_CONTEXT } from '../constants/validation-error-contexts';
import { ExceptionError } from '../types/exception';

const logger = new Logger('MapValidationErrors');

export function mapValidationErrors(errors: ValidationError[]): ExceptionError[] {
  return errors.flatMap((error) => {
    if (error.children?.length) return mapValidationErrors(error.children);

    if (!error.contexts || !Object.entries(error.contexts).length) {
      logger.warn(`There are no contexts for property ${error.property}`);
      const validationError = error.constraints?.whitelistValidation;

      return {
        errorCode: VALIDATION_ERROR_CONTEXT.DEFAULT_VALIDATION_ERROR.errorCode,
        message: validationError || VALIDATION_ERROR_CONTEXT.DEFAULT_VALIDATION_ERROR.message,
      };
    }

    return Object.entries(error.contexts).map(([fieldName, { errorCode, message }]) => ({
      errorCode: errorCode || VALIDATION_ERROR_CONTEXT.DEFAULT_VALIDATION_ERROR.errorCode,
      message: message || error.constraints[fieldName] || VALIDATION_ERROR_CONTEXT.DEFAULT_VALIDATION_ERROR.message,
    }));
  });
}
