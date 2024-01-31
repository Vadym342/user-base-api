import { Exception, ExceptionError } from './exception';

export type DatabaseException = Pick<Exception, 'name' | 'statusCode'> & {
  errors: DatabaseExceptionError[];
};

export type DatabaseExceptionError = ExceptionError & {
  pgCode?: string;
  pgMessage?: string;
};
