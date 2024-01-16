import * as path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('TYPEORM_HOST'),
        port: +configService.get('TYPEORM_PORT'),
        database: configService.get('TYPEORM_DATABASE'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        entities: [path.join(__dirname, '../', '**', '*.entity{.ts,.js}')],
        logger: 'advanced-console',
        logging: 'all',
        // [path.join(__dirname, 'modules', '**', '*.entity{.ts,.js}')],
        //[__dirname + '/**/*.entity{.ts, .js}'], //[path.join(__dirname, '..', 'modules', '**', '*.entity{.ts,.js}')],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
