import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class SwaggerErrorResponse {
  @ApiProperty({
    example: 'SomeErrorException',
    type: 'string',
  })
  type: string;

  @ApiProperty({
    example: 'Some message...',
    type: 'string',
  })
  message: string;

  @ApiProperty({
    example: HttpStatus.I_AM_A_TEAPOT,
    type: 'number',
  })
  statusCode: number;
}

export class SwaggerError400Response extends SwaggerErrorResponse {
  @ApiProperty({
    example: HttpStatus.BAD_REQUEST,
    type: 'number',
  })
  statusCode: number;
}
export class SwaggerError401Response extends SwaggerErrorResponse {
  @ApiProperty({
    example: HttpStatus.UNAUTHORIZED,
    type: 'number',
  })
  statusCode: number;
}
export class SwaggerError403Response extends SwaggerErrorResponse {
  @ApiProperty({
    example: HttpStatus.FORBIDDEN,
    type: 'number',
  })
  statusCode: number;
}
export class SwaggerError404Response extends SwaggerErrorResponse {
  @ApiProperty({
    example: HttpStatus.NOT_FOUND,
    type: 'number',
  })
  statusCode: number;
}
export class SwaggerError500Response extends SwaggerErrorResponse {
  @ApiProperty({
    example: HttpStatus.INTERNAL_SERVER_ERROR,
    type: 'number',
  })
  statusCode: number;
}
export class SwaggerError503Response extends SwaggerErrorResponse {
  @ApiProperty({
    example: HttpStatus.SERVICE_UNAVAILABLE,
    type: 'number',
  })
  statusCode: number;
}

export const SwaggerApiHeaders = [
  {
    name: 'userId',
    description: 'Id of selected user',
    schema: {
      example: 'e8eccae6-8d7f-4a87-b111-0defb9afc564',
    },
    required: true,
  },
];
