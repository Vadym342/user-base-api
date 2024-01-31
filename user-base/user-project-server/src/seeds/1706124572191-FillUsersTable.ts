import { In, MigrationInterface, QueryRunner } from 'typeorm';

import { entityUsers } from '@src/constants/seed';

import { User } from '@modules/user/entities/user.entity';

const { NODE_ENV } = process.env;

export class FillUsersTable1706124572191 implements MigrationInterface {
  private readonly data = entityUsers[NODE_ENV];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(User).insert([
      {
        id: this.data[0].id,
        email: this.data[0].email,
        firstName: this.data[0].firstName,
        lastName: this.data[0].lastName,
        age: this.data[0].age,
        password: this.data[0].password,
        createdDate: '2022-07-22T05:06:13.652Z',
        updatedDate: '2022-08-12T11:35:55.434Z',
        deletedDate: null,
      },
      {
        id: this.data[1].id,
        email: this.data[1].email,
        firstName: this.data[1].firstName,
        lastName: this.data[1].lastName,
        age: this.data[1].age,
        password: this.data[1].password,
        createdDate: '2022-08-11T07:22:04.481Z',
        updatedDate: '2022-08-11T07:22:04.481Z',
        deletedDate: null,
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(User).delete({
      id: In(this.data.map((user) => user.id)),
    });
  }
}
