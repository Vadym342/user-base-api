import { validateErrorContexts } from '../utils/validate-error-contexts';

export const VALIDATION_ERROR_CONTEXT = {
  // Default
  DEFAULT_VALIDATION_ERROR: {
    errorCode: 10000,
    message: 'Validation error happened',
  },

  // Auth JWT
  AUTH_JWT_UNAUTHORIZED: {
    errorCode: 10101,
    message: 'User is not authorized',
  },
  AUTH_JWT_AUTH_HEADER_REQUIRED: {
    errorCode: 10102,
    message: 'Auth header required',
  },
  AUTH_JWT_AUTH_ACCESS_DENIED: {
    errorCode: 10103,
    message: 'Access denied',
  },

  // User
  USER_ENTITY_NOT_FOUND: {
    errorCode: 10201,
    message: 'User not found',
  },
  USER_ENTITY_ALREADY_EXIST: {
    errorCode: 10202,
    message: 'User already exist',
  },
  USER_FIRSTNAME_IS_NOT_STRING: {
    errorCode: 10203,
    message: 'User firstname should be a string',
  },
  USER_FIRSTNAME_LENGTH_INVALID: {
    errorCode: 10204,
    message: 'User firstname length should be less than 100 symbols',
  },
  USER_EMAIL_LENGTH_INVALID: {
    errorCode: 10205,
    message: 'User email length should be less than 96 symbols',
  },
  USER_EMAIL_IS_NOT_STRING: {
    errorCode: 10206,
    message: 'User email should be a string',
  },
  USER_LASTNAME_IS_NOT_STRING: {
    errorCode: 10207,
    message: 'User lastname should be a string',
  },
  USER_LASTNAME_LENGTH_INVALID: {
    errorCode: 10208,
    message: 'User lastname length should be less than 100 symbols',
  },
  USER_AGE_INVALID: {
    errorCode: 10209,
    message: 'User age should be an integer in range from 18 to 100',
  },
  USER_PASSWORD_LENGTH_INVALID: {
    errorCode: 10210,
    message: 'User password should be an string in range from 5 to 20',
  },
  USER_PASSWORD_IS_NOT_STRING: {
    errorCode: 10211,
    message: 'User password should be a string',
  },
} as const;

validateErrorContexts(VALIDATION_ERROR_CONTEXT, 'Validation');
