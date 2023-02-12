import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesModule } from '../favorites/favorites.module';
import { TrackModule } from '../track/track.module';
import { AlbumController } from './album.controller';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    forwardRef(() => FavoritesModule),
    TrackModule,
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [TypeOrmModule],
})
export class AlbumModule {}
