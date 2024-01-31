import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { AuthMiddleware } from '@src/middleware/auth.middleware';

import { AuthModule } from '@modules/auth/auth.module';
import { CommonModule } from '@modules/common/common.module';
import { UserModule } from '@modules/user/user.module';

@Global()
@Module({ imports: [CommonModule.forTest(), UserModule, AuthModule] })
export class CommonTestingModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).exclude({ path: 'user', method: RequestMethod.POST }).forRoutes('*');
  }
}
