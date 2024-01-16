import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config } from 'dotenv';

import { AppModule } from './modules/app/app.module';
import { useSwagger } from './utils/swagger';

config();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  useSwagger(app);
  app.enableCors();

  await app.listen(Number(process.env.APPLICATION_PORT) || 3030);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
