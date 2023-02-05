import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { forwardRef, Module } from '@nestjs/common';
import { FavoritesModule } from '../favorites/favorites.module';
import { TrackController } from './track.controller';
import { TrackRepository } from './track.repository';
import { TrackService } from './track.service';

@Module({
  imports: [
    InMemoryDBModule.forFeature('track'),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [TrackController],
  providers: [TrackService, TrackRepository],
  exports: [TrackRepository],
})
export class TrackModule {}
