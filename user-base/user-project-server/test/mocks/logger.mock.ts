import { Logger } from '@nestjs/common';

import { entityUsers } from '@src/constants/seed';

export const mockLogger: jest.MockedObject<Partial<Logger>> = {
  log: jest.fn(),
  debug: jest.fn(),
  error: jest.fn(),
  verbose: jest.fn(),
  warn: jest.fn(),
  localInstance: {
    log: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    verbose: jest.fn(),
    warn: jest.fn(),
  },
};

export const cognitoEmail = entityUsers.development[0].email;
