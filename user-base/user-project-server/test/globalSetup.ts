require('ts-node').register({ transpileOnly: true });
require('tsconfig-paths').register();

import { config } from 'dotenv';

import * as utils from './utils';

config();

module.exports = async (): Promise<void> => {
  const environment = await utils.setupEnvironment();

  process.env.TEST_DB_HOST = environment.getContainer('user_db_test').getHost();
  process.env.TYPEORM_SCHEMA = 'user_schema_test';
  process.env.DISABLE_TIME_RESTRICTIONS = 'false';

  await utils.setupDatabase();

  global.environment = environment;
};
