import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';
import { FavoritesController } from './favorites.controller';
import { FavoritesEntity } from './favorites.entity';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity]),
    TrackModule,
    AlbumModule,
    ArtistModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [TypeOrmModule],
})
export class FavoritesModule {}
