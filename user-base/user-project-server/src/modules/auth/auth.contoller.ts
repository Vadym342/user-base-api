import { Controller, Request, Post, UseGuards, Get, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';

import { AuthorizationUserResponseType } from '@modules/user/constants/user.types';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<AuthorizationUserResponseType> {
    this.logger.log('Log in User');

    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req): Promise<AuthorizationUserResponseType> {
    this.logger.log('Get User info');

    return {
      id: req.user.id,
      email: req.user.email,
      token: this.jwtService.sign({ id: req.user.id, email: req.user.email }),
    };
  }
}
