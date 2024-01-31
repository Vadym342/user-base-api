import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

import { ValidationException, mapValidationErrors } from '@src/exceptions';

export const globalValidationPipe = new ValidationPipe({
  enableDebugMessages: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
  transform: true,
  stopAtFirstError: true,
  exceptionFactory(errors): ValidationException {
    const errs = mapValidationErrors(errors);

    return new ValidationException(errs);
  },
});
