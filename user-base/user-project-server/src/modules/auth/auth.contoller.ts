import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';

import { AuthorizationUserResponseType } from '@modules/user/constants/user.types';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<AuthorizationUserResponseType> {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req): Promise<AuthorizationUserResponseType> {
    return {
      id: req.user.id,
      email: req.user.email,
      token: this.jwtService.sign({ id: req.user.id, email: req.user.email }),
    };
  }
}
