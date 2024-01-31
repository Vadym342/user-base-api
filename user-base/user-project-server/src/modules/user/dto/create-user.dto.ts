import { IsEmail, IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(96, { context: VALIDATION_ERROR_CONTEXT.USER_EMAIL_LENGTH_INVALID })
  @IsString({ context: VALIDATION_ERROR_CONTEXT.USER_EMAIL_IS_NOT_STRING })
  email: string;

  @MaxLength(100, { context: VALIDATION_ERROR_CONTEXT.USER_FIRSTNAME_LENGTH_INVALID })
  @IsString({ context: VALIDATION_ERROR_CONTEXT.USER_FIRSTNAME_IS_NOT_STRING })
  firstName: string;

  @MaxLength(100, { context: VALIDATION_ERROR_CONTEXT.USER_LASTNAME_LENGTH_INVALID })
  @IsString({ context: VALIDATION_ERROR_CONTEXT.USER_LASTNAME_IS_NOT_STRING })
  lastName: string;

  @Max(100, { context: VALIDATION_ERROR_CONTEXT.USER_AGE_INVALID })
  @Min(18, { context: VALIDATION_ERROR_CONTEXT.USER_AGE_INVALID })
  @IsInt({ context: VALIDATION_ERROR_CONTEXT.USER_AGE_INVALID })
  age: number;

  @MaxLength(20, { context: VALIDATION_ERROR_CONTEXT.USER_PASSWORD_LENGTH_INVALID })
  @MinLength(5, { context: VALIDATION_ERROR_CONTEXT.USER_PASSWORD_LENGTH_INVALID })
  @IsString({ context: VALIDATION_ERROR_CONTEXT.USER_PASSWORD_IS_NOT_STRING })
  password: string;
}
