import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { TrackModule } from '../track/track.module';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './album.repository';
import { AlbumService } from './album.service';

@Module({
  imports: [InMemoryDBModule.forFeature('album'), TrackModule],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  exports: [AlbumRepository],
})
export class AlbumModule {}
