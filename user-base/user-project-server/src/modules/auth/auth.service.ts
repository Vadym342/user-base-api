import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { ForbiddenException, VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

import { AuthorizationUserResponseType, LoginUserBodyType, LoginUserEntityType } from '@modules/user/constants/user.types';
import { GetUserResponseType } from '@modules/user/dto/get-one-user.response.dto';
import { UserService } from '@modules/user/services/user.service';

import { JwtPayload } from './auth-jwt.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<LoginUserBodyType> {
    const user = await this.userService.getAuthUser(email);

    if (!user) {
      throw new ForbiddenException(VALIDATION_ERROR_CONTEXT.AUTH_JWT_AUTH_ACCESS_DENIED);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return user;
    }

    throw new ForbiddenException(VALIDATION_ERROR_CONTEXT.AUTH_JWT_UNAUTHORIZED);
  }

  async login(user: LoginUserEntityType): Promise<AuthorizationUserResponseType> {
    const { id, email } = user;

    return {
      id,
      email,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }

  async authenticate(jwtToken: string): Promise<any> {
    const result = this.jwtService.decode(jwtToken);

    if (!result) {
      throw new ForbiddenException(VALIDATION_ERROR_CONTEXT.AUTH_JWT_UNAUTHORIZED);
    }

    return result;
  }

  async getBearerJwtToken(req): Promise<string> {
    if (!req.header('Authorization')) {
      throw new ForbiddenException(VALIDATION_ERROR_CONTEXT.AUTH_JWT_AUTH_HEADER_REQUIRED);
    }

    return req.header('Authorization').split(' ').pop();
  }

  async getUserData(jwtPayload: JwtPayload): Promise<GetUserResponseType> {
    return this.userService.getOneUser(jwtPayload.email);
  }
}
