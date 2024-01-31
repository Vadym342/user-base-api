import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DATABASE_ERROR_CONTEXT, DatabaseException } from '@src/exceptions';

import { CreateUserDto } from './dto/create-user.dto';
import { GetUserResponseType } from './dto/get-one-user.response.dto';
import { GetUserListResponseDto } from './dto/get-user-list.response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  private readonly logger = new Logger(UserRepository.name);

  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createOne(data: CreateUserDto): Promise<void> {
    try {
      await this.save(data);
    } catch (error) {
      this.logger.log('Creating user exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_CREATE_ONE);
    }
  }

  async getOne(email: string): Promise<GetUserResponseType> {
    try {
      return await this.createQueryBuilder('u')
        .select([
          'u.id AS "id"',
          'u.email AS "email"',
          'u.age AS "age"',
          'u.first_name AS "firstName"',
          'u.last_name AS "lastName"',
        ])
        .where('u.email = :email', {
          email,
        })
        .getRawOne();
    } catch (error) {
      this.logger.log('Selecting User exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_GET_ONE);
    }
  }

  async getAuth(email: string): Promise<User> {
    try {
      return await this.findOne({ where: { email } });
    } catch (error) {
      this.logger.log('Selecting User exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_GET_AUTH_ONE);
    }
  }

  async getAll(): Promise<GetUserListResponseDto> {
    try {
      const query = this.createQueryBuilder('u').select([
        'u.id AS "id"',
        'u.email AS "email"',
        'u.age AS "age"',
        'u.first_name AS "firstName"',
        'u.last_name AS "lastName"',
      ]);

      const [data, total] = await Promise.all([query.getRawMany(), query.getCount()]);

      return { total, data };
    } catch (error) {
      this.logger.log('Selecting User exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_GET_MANY);
    }
  }

  async updateOne(id: string, data: UpdateUserDto): Promise<void> {
    try {
      await this.update(id, data);
    } catch (error) {
      this.logger.log('Updating User exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_UPDATE_ONE);
    }
  }

  async deleteOne(id: string): Promise<void> {
    try {
      await this.delete(id);
    } catch (error) {
      this.logger.log('Deleting User exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.USER_DELETE_ONE);
    }
  }
}
