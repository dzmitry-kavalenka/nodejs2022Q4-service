import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesModule } from '../favorites/favorites.module';
import { TrackController } from './track.controller';
import { TrackEntity } from './track.entity';
import { TrackRepository } from './track.repository';
import { TrackService } from './track.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackEntity]),
    forwardRef(() => FavoritesModule),
  ],
  controllers: [TrackController],
  providers: [TrackService, TrackRepository],
  exports: [TrackRepository],
})
export class TrackModule {}
