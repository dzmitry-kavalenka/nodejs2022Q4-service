import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  imports: [InMemoryDBModule.forFeature('artist')],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
