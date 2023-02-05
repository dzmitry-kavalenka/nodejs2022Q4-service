import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistRepository } from './artist.repository';

@Module({
  imports: [InMemoryDBModule.forFeature('artist'), TrackModule, AlbumModule],
  providers: [ArtistService, ArtistRepository],
  controllers: [ArtistController],
  exports: [ArtistRepository],
})
export class ArtistModule {}
