import 'dotenv/config';
import * as path from 'path';

import { DataSourceOptions, DataSource } from 'typeorm';

export const seedConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  database: process.env.TYPEORM_DATABASE,
  schema: process.env.TYPEORM_SCHEMA,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  logger: 'advanced-console',
  logging: true,
  entities: [path.join(__dirname, '..', '/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '..', 'seeds/*{.ts,.js}')],
  migrationsTableName: 'seeds',
};

export const seedingDataSource: DataSource = new DataSource(seedConfig);
