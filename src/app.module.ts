import { Module } from '@nestjs/common';
import { InMemoryDBV1Module } from '@nestjs-addons/in-memory-db';
import { UserModule } from './user/user.module';

@Module({
  imports: [InMemoryDBV1Module.forRoot({}), UserModule],
})
export class AppModule {}
