import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetup } from '../swagger/swaggerSetup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swaggerSetup(app);

  await app.listen(4000);
}
bootstrap();
