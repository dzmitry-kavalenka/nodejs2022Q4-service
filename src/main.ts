import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { swaggerSetup } from '../swagger/swaggerSetup';
import { Logger } from './common/logger/logger.service';
import { HttpExceptionFilter } from './common/exception/exception.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: ['error', 'warn', 'log', 'verbose', 'debug'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  // app.useLogger(app.get(Logger));

  swaggerSetup(app);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
