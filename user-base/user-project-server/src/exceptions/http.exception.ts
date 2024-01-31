import { HttpException as Base, HttpStatus } from '@nestjs/common';

export class HttpException extends Base {
  readonly name = HttpException.name;
  readonly statusCode: HttpStatus;
  readonly errorCode: number;

  constructor(statusCode: HttpStatus, message: string, errorCode: number) {
    super(message, statusCode);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}
