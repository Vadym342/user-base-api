import * as path from 'path';

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  maxWorkers: 1,
  workerIdleMemoryLimit: '500MB',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  roots: ['<rootDir>/test/e2e', '<rootDir>/src/modules', '<rootDir>/test/integration'],
  testRegex: '.(e2e-spec|integration).ts$',
  slowTestThreshold: 30,
  rootDir: path.join('..'),
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsconfig: {
          isolatedModules: true,
          sourceMap: true,
        },
      },
    ],
  },
  moduleNameMapper: {
    '^@modules(.*)$': '<rootDir>/src/modules$1',
    '^@src(.*)$': '<rootDir>/src$1',
    '^@test(.*)$': '<rootDir>/test$1',
  },
  globalSetup: '<rootDir>/test/globalSetup.ts',
  globalTeardown: '<rootDir>/test/globalTeardown.ts',
};

export default config;
