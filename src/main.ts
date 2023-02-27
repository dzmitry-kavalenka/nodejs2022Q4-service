import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { swaggerSetup } from '../swagger/swaggerSetup';
import { HttpExceptionFilter } from './common/exception/exception.filter';
import { handleProcessErrors, getLogLevels } from './utils';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: getLogLevels(process.env.NODE_ENV === 'production'),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  swaggerSetup(app);

  handleProcessErrors();

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
