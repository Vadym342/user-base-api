import { QueryRunner } from 'typeorm';

import { BaseMigration } from '@src/database/base-migrations';

export class CreateTableUser1706110083162 extends BaseMigration {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.applySchema(queryRunner);
    await queryRunner.query(`
      CREATE TABLE users (
        id               UUID DEFAULT uuid_generate_v4()       NOT NULL,
        email            VARCHAR(96)                           NOT NULL,
        first_name       VARCHAR(100)                          NOT NULL,
        last_name        VARCHAR(100)                          NOT NULL,
        age              INT                                   NOT NULL,
        password         VARCHAR                               NOT NULL,
        created_date     TIMESTAMP   DEFAULT current_timestamp NOT NULL,
        updated_date     TIMESTAMP   DEFAULT current_timestamp NOT NULL,
        deleted_date     TIMESTAMP,
        CONSTRAINT pk_users PRIMARY KEY (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.applySchema(queryRunner);
    await queryRunner.query(`DROP TABLE users;`);
  }
}
