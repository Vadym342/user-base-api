import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { DATABASE_ERROR_CONTEXT, ValidationException } from '@src/exceptions';

import { CreateUserDto } from '../dto/create-user.dto';
import { GetUserResponseType } from '../dto/get-one-user.response.dto';
import { GetUserListResponseDto } from '../dto/get-user-list.response.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly userEntityRepository: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<void> {
    this.logger.log('Creating new User');

    try {
      const hashedPassword = await bcrypt.hash(data.password, +process.env.SALT);

      await this.userEntityRepository.createOne({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        password: hashedPassword,
      });
    } catch (error) {
      this.logger.log('Creating user exception', error);

      throw new ValidationException(DATABASE_ERROR_CONTEXT.USER_CREATE_ONE);
    }
  }

  async getOneUser(email: string): Promise<GetUserResponseType> {
    this.logger.log('Getting User');

    return await this.userEntityRepository.getOne(email);
  }

  async getAuthUser(email: string): Promise<User> {
    this.logger.log('Getting Auth User');

    return await this.userEntityRepository.getAuth(email);
  }

  async getAllUsers(): Promise<GetUserListResponseDto> {
    this.logger.log('Getting User List');

    return await this.userEntityRepository.getAll();
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<void> {
    this.logger.log('Updating User');

    return await this.userEntityRepository.updateOne(id, {
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
    });
  }

  async deleteUser(id: string): Promise<void> {
    this.logger.log('Deleting User');

    return await this.userEntityRepository.deleteOne(id);
  }
}
