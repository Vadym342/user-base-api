/* eslint-disable no-console */
import { DataSource } from 'typeorm';

import 'dotenv/config';
import { getDataSourceConfig } from '@src/database/ormconfig';

const { TYPEORM_SCHEMA, TYPEORM_USERNAME } = process.env;

async function createDatabaseSchema() {
  const dataSource = await new DataSource(getDataSourceConfig()).initialize();

  try {
    await dataSource.query(`CREATE SCHEMA IF NOT EXISTS ${TYPEORM_SCHEMA} AUTHORIZATION ${TYPEORM_USERNAME};`);
  } catch (error) {
    console.error(error);
  } finally {
    await dataSource.destroy();
  }
}

createDatabaseSchema()
  .then(() => {
    console.log('Schema was created');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
