import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { forwardRef, Module } from '@nestjs/common';
import { FavoritesModule } from '../favorites/favorites.module';
import { TrackModule } from '../track/track.module';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './album.repository';
import { AlbumService } from './album.service';

@Module({
  imports: [
    InMemoryDBModule.forFeature('album'),
    forwardRef(() => FavoritesModule),
    TrackModule,
  ],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  exports: [AlbumRepository],
})
export class AlbumModule {}
