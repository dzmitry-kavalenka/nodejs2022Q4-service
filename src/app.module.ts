import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    InMemoryDBModule.forRoot({}),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
  ],
})
export class AppModule {}
