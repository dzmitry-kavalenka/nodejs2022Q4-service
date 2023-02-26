import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerSetup = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('REST-Service-API')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addTag('Rest API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/doc', app, document);
};
