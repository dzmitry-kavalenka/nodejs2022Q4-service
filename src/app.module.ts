import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '../migrations/**/*{.ts,.js}'],
      synchronize: true,
    }),
    InMemoryDBModule.forRoot({}),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
  ],
})
export class AppModule {}
