import { Module } from '@nestjs/common';
// import { FavoritesModule } from '../favorites/favorites.module';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './artist.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([ArtistEntity]),
    // FavoritesModule,
    AlbumModule,
    TrackModule,
  ],
  providers: [ArtistService],
  controllers: [ArtistController],
  exports: [TypeOrmModule],
})
export class ArtistModule {}
