import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';

export function useSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('USER BASE API')
    .setDescription('YOUR IT SOFT TEST PROJECT')
    .setVersion(process.env.APP_VERSION)
    .addApiKey(
      {
        description: 'Customer id in <b>uuid</b> format',
        name: 'customerId',
        type: 'apiKey',
        in: 'header',
      },
      'customerId',
    )
    .addSecurityRequirements('customerId')
    .addBearerAuth(
      {
        description: `Please enter token in following format: Bearer ${API_BEARER_AUTH_TYPE}`,
        name: 'Authorization',
        bearerFormat: `${API_BEARER_AUTH_TYPE}`,
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      `${API_BEARER_AUTH_TYPE}`,
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
