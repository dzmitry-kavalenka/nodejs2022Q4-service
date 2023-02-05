import { Module } from '@nestjs/common';
import { InMemoryDBV1Module } from '@nestjs-addons/in-memory-db';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [InMemoryDBV1Module.forRoot({}), UserModule, ArtistModule],
})
export class AppModule {}
