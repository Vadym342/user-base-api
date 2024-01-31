require('ts-node').register({ transpileOnly: true });
require('tsconfig-paths').register();

import * as utils from './utils';

module.exports = async (): Promise<void> => {
  await utils.teardownDatabase();
  await global.environment.down();
};
