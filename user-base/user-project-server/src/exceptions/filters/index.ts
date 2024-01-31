import { ExceptionFilter } from '@nestjs/common';

import { DatabaseExceptionFilter } from './database-exception-filter';
import { DefaultExceptionFilter } from './default-exception-filter';
import { HttpExceptionFilter } from './http-exception-filter';
import { ValidationExceptionFilter } from './validation-exception-filter';

export const globalExceptionFilters: ExceptionFilter[] = [
  new DefaultExceptionFilter(),
  new ValidationExceptionFilter(),
  new HttpExceptionFilter(),
  new DatabaseExceptionFilter(),
];
