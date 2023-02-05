import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackRepository } from './track.repository';
import { TrackService } from './track.service';

@Module({
  imports: [InMemoryDBModule.forFeature('track')],
  controllers: [TrackController],
  providers: [TrackService, TrackRepository],
  exports: [TrackRepository],
})
export class TrackModule {}
