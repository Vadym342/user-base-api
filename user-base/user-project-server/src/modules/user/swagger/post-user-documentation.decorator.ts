import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiServiceUnavailableResponse } from '@nestjs/swagger';

import { SwaggerError400Response, SwaggerError404Response, SwaggerError503Response } from '@modules/execption/swagger/resources';

import { CreateUserDto } from '../dto/create-user.dto';

export function PostUserAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Create User',
      description: `
        <p>Create User</p>
      `,
    }),
    ApiCreatedResponse({
      description: 'User sucssesfully created.',
    }),
    ApiBadRequestResponse({
      description: 'Validation error',
      type: SwaggerError400Response,
    }),
    ApiBadRequestResponse({
      description: 'Not found error',
      type: SwaggerError404Response,
    }),
    ApiServiceUnavailableResponse({
      description: 'Service error',
      type: SwaggerError503Response,
    }),
    ApiBody({
      type: CreateUserDto,
      examples: {
        validUserBodyExample: {
          value: validUserBodyExample,
        },
      },
    }),
  );
}

export const validUserBodyExample: CreateUserDto = {
  email: 'test.email@gmail.com',
  firstName: 'Harry',
  lastName: 'Potter',
  age: 21,
  password: 'akcio',
};
