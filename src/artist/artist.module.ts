import { forwardRef, Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { FavoritesModule } from '../favorites/favorites.module';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistRepository } from './artist.repository';

@Module({
  imports: [
    InMemoryDBModule.forFeature('artist'),
    forwardRef(() => FavoritesModule),
    AlbumModule,
    TrackModule,
  ],
  providers: [ArtistService, ArtistRepository],
  controllers: [ArtistController],
  exports: [ArtistRepository],
})
export class ArtistModule {}
