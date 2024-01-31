import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

import { AuthService } from '@modules/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private readonly authService: AuthService) {}

  async use(req, res: Response, next: NextFunction): Promise<void> {
    this.logger.log('Authentication JWT');

    try {
      const jwtToken = await this.authService.getBearerJwtToken(req);
      const identityUser = await this.authService.authenticate(jwtToken);

      req.user = await this.authService.getUserData(identityUser);

      next();
    } catch (error) {
      this.logger.error(error.message);

      throw error;
    }
  }
}
