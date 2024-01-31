import * as path from 'path';

import 'dotenv/config';
import { PinoLogger } from 'nestjs-pino';
import { DataSourceOptions } from 'typeorm';

import { TypeOrmModuleLogger } from './typeorm-logger';

export const getDataSourceConfig = (logger?: PinoLogger): DataSourceOptions => ({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  schema: process.env.TYPEORM_SCHEMA,
  password: process.env.TYPEORM_PASSWORD,
  logger: logger ? new TypeOrmModuleLogger(logger) : 'advanced-console',
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: [path.join(__dirname, '..', 'modules', '**', '*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*{.ts,.js}')],
  migrationsTableName: 'migrations',
  // synchronize: true, //! Migrations
});
