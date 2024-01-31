import { MigrationInterface, QueryRunner } from 'typeorm';

import 'dotenv/config';

const { TYPEORM_SCHEMA } = process.env;

export abstract class BaseMigration implements MigrationInterface {
  protected async applySchema(queryRunner: QueryRunner, schema: string = TYPEORM_SCHEMA): Promise<void> {
    await queryRunner.query(`SET search_path TO "${schema}", public;`);
  }

  protected setSecurityDefiner(schema: string = TYPEORM_SCHEMA): string {
    return `SECURITY DEFINER SET search_path TO "${schema}", public`;
  }

  abstract up(queryRunner: QueryRunner): Promise<void>;

  abstract down(queryRunner: QueryRunner): Promise<void>;
}
