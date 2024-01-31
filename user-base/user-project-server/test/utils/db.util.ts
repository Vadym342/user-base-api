import * as path from 'path';

import { DataSource, DataSourceOptions, DeleteResult, EntityManager, FindOptionsWhere, ObjectType } from 'typeorm';

import { UseTableCleanUpType } from './util.types';

export function getDatabaseBaseOptions(): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.TEST_DB_HOST,
    port: +process.env.TEST_DB_PORT,
    database: process.env.TEST_DB_DATABASE,
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    schema: process.env.TYPEORM_SCHEMA,
    entities: [path.join(__dirname, '..', '..', 'src', 'modules', '**/*.entity{.ts,.js}')],
    subscribers: [path.join(__dirname, '..', '..', 'src', 'subscriber', '*.subscriber{.ts,.js}')],
  };
}

export function getMigrationsDataSource(): Promise<DataSource> {
  return new DataSource({
    ...getDatabaseBaseOptions(),
    migrations: [path.join(__dirname, '..', '..', 'src', 'migrations/*{.ts,.js}')],
    migrationsTableName: 'migrations',
  }).initialize();
}

export function getSeedsDataSource(): Promise<DataSource> {
  return new DataSource({
    ...getDatabaseBaseOptions(),
    migrations: [path.join(__dirname, '..', '..', 'src', 'seeds/*{.ts,.js}')],
    migrationsTableName: 'seeds',
  }).initialize();
}

/**
 * A higher order function that returns utility functions to work with tables
 * and perform a clean up after test case end.
 *
 * @example
 * const entityManager = application.get(EntityManager);
 *
 * const { clearTable, truncateTable, resetSequence } = useTableCleanup(entityManager);
 */
export function useTableCleanup(entityManager: EntityManager): UseTableCleanUpType {
  /**
   * Delete the entries from the table by id or other conditions.
   *
   * @example
   * const { clearTable } = useTableCleanup(entityManager);
   *
   * await clearTable(ChargeEntity); // TRUNCATE TABLE "schema"."charge";
   *
   */
  async function clearTable<T>(entity: ObjectType<T>, options: FindOptionsWhere<T> = {}): Promise<DeleteResult> {
    return await entityManager.getRepository(entity).delete(options);
  }

  /**
   * Truncates the table of the entity passed as argument.
   *
   * Optionally `RESTART IDENTITY` of the entity.
   *
   * @example
   * const { truncateTable } = useTableCleanup(entityManager);
   *
   * await truncateTable(reconciliationEntity);       // TRUNCATE TABLE "schema"."reconciliations";
   * await truncateTable(reconciliationEntity, true); // TRUNCATE TABLE "schema"."reconciliations" RESTART IDENTITY;
   */
  async function truncateTable<T>(entity: ObjectType<T>, restartIdentity?: true): Promise<void> {
    const entityMetadata = entityManager.connection.getMetadata(entity);
    const { givenTableName: table, schema } = entityMetadata;
    let sql = `TRUNCATE TABLE "${schema}"."${table}"`;

    if (restartIdentity) sql += ' RESTART IDENTITY;';
    else sql += ';';

    return await entityManager.query(sql);
  }

  /**
   * Resets sequence and uses max stored value from the table key passed as argument.
   * For safety reasons the sequence name and key for MAX(key) value should be passed
   * to avoid collisions/
   *
   * @example
   * const { resetSequence } = useTableCleanup(entityManager);
   *
   * await resetSequence(CodeEntity, 'code_id_seq', 'code_id');
   * // SELECT setval('code_id_seq', MAX("code_id")) FROM "schema"."code";
   */
  async function resetSequence<T>(entity: ObjectType<T>, sequence: string, key: string): Promise<void> {
    const entityMetadata = entityManager.connection.getMetadata(entity);
    const { givenTableName: table, schema } = entityMetadata;

    return await entityManager.query(`SELECT setval('${schema}.${sequence}', MAX("${key}")) FROM "${schema}"."${table}";`);
  }

  return { entityManager, clearTable, truncateTable, resetSequence };
}
