import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

@Injectable()
export class UserValidatorService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
  async doesUserExist(id?: string, email?: string): Promise<boolean> {
    let user = {};

    if (email) {
      user = await this.doesUserEntityExistByEmail(email);
    }

    if (id) {
      user = await this.doesUserEntityExistById(id);
    }

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return true;
  }

  async doesUserAlreadyCreated(email: string): Promise<boolean> {
    const user = await this.doesUserEntityExistByEmail(email);

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return true;
  }

  private async doesUserEntityExistByEmail(email: string): Promise<boolean> {
    return await this.userRepository.exists({ where: { email } });
  }

  private async doesUserEntityExistById(id: string): Promise<boolean> {
    return await this.userRepository.exists({ where: { id } });
  }
}
