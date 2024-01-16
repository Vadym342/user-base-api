import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';

import {
  SwaggerError400Response,
  SwaggerError404Response,
  SwaggerError401Response,
  SwaggerError503Response,
} from '@modules/execption/swagger/resources';

import { UpdateUserDto } from '../dto/update-user.dto';

export function UpdateUserAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Update User',
      description: 'Update User',
    }),
    ApiBearerAuth(API_BEARER_AUTH_TYPE),
    ApiNoContentResponse({
      description: 'User was successfully updated',
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
    ApiBody({
      type: UpdateUserDto,
      examples: {
        validUserResponse: {
          summary: 'User updates ',
          value: validUserResponse,
        },
      },
    }),
  );
}

const validUserResponse: UpdateUserDto = {
  firstName: 'Jesse',
  lastName: 'Mcree',
  age: 21,
};
