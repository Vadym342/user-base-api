/* eslint-disable no-console */
import * as path from 'path';

import { DockerComposeEnvironment, StartedDockerComposeEnvironment } from 'testcontainers';

import { getMigrationsDataSource, getSeedsDataSource } from './db.util';

export function setupEnvironment(): Promise<StartedDockerComposeEnvironment> {
  const { TEST_DB_DATABASE, TEST_DB_USERNAME, TEST_DB_PASSWORD, TEST_DB_PORT } = process.env;

  return new DockerComposeEnvironment(path.join(__dirname, '..'), 'docker-compose.test.yml')
    .withEnvironment({
      TEST_DB_DATABASE,
      TEST_DB_USERNAME,
      TEST_DB_PASSWORD,
      TEST_DB_PORT,
    })
    .up();
}

export async function setupDatabase(): Promise<void> {
  console.log('\nDatabase setup started');
  console.time('Database setup done in');

  const migrationsDataSource = await getMigrationsDataSource();

  const [{ connected }] = await migrationsDataSource.query('SELECT true AS connected');

  console.log('Database connected:', connected);

  await migrationsDataSource.query(`CREATE SCHEMA IF NOT EXISTS "${process.env.TYPEORM_SCHEMA}";`);
  await migrationsDataSource.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
  await migrationsDataSource.runMigrations();
  await migrationsDataSource.destroy();

  const seedsDataSource = await getSeedsDataSource();
  await seedsDataSource.runMigrations();

  await seedsDataSource.destroy();
  console.timeLog('Database setup done in');
}

export async function teardownDatabase(): Promise<void> {
  console.log('\nDatabase teardown started');
  console.time('Database teardown done in');

  const migrationConnection = await getMigrationsDataSource();
  await migrationConnection.query(`DROP SCHEMA IF EXISTS "${process.env.TYPEORM_SCHEMA}" CASCADE;`);
  await migrationConnection.destroy();
  console.timeLog('Database teardown done in');
}
