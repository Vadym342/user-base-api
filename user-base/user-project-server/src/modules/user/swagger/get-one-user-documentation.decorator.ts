import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';

import {
  SwaggerError400Response,
  SwaggerError401Response,
  SwaggerError404Response,
  SwaggerError503Response,
} from '@modules/execption/swagger/resources';

import { UserResponse } from './get-user-list-documentation.decorator';

export function GetUserAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Get one User',
    }),
    ApiBearerAuth(API_BEARER_AUTH_TYPE),
    ApiExtraModels(UserResponse),
    ApiOkResponse({
      description: 'User was successfully got',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          $ref: getSchemaPath(UserResponse),
        },
        example: validUserListResponse,
      },
    }),
    ApiBadRequestResponse({
      description: 'Validation error',
      type: SwaggerError400Response,
    }),
    ApiBadRequestResponse({
      description: 'Not found error',
      type: SwaggerError404Response,
    }),
    ApiUnauthorizedResponse({
      description: 'Not authorized',
      type: SwaggerError401Response,
    }),
    ApiServiceUnavailableResponse({
      description: 'Service error',
      type: SwaggerError503Response,
    }),
  );
}
export const validUserListResponse: UserResponse = {
  id: 'df467ffb-0a63-404c-92f9-b5b52108061f',
  age: 12,
  email: 'test1@total.com',
  firstName: 'test',
  lastName: 'test',
};
