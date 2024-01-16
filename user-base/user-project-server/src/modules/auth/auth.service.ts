import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthorizationUserResponseType, LoginUserBodyType, LoginUserEntityType } from '@modules/user/constants/user.types';
import { UserService } from '@modules/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<LoginUserBodyType> {
    const user = await this.userService.getAuthUser(email);

    if (!user) {
      throw new HttpException('Access denied.', HttpStatus.FORBIDDEN);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return user;
    }

    throw new HttpException('Incorrect input data.', HttpStatus.FORBIDDEN);
  }

  async login(user: LoginUserEntityType): Promise<AuthorizationUserResponseType> {
    const { id, email } = user;

    return {
      id,
      email,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }
}
