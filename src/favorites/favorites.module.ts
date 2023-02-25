import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from '@app/album/album.module';
import { ArtistModule } from '@app/artist/artist.module';
import { TrackModule } from '@app/track/track.module';
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
