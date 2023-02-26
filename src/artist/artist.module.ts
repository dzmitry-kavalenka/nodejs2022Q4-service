import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  providers: [ArtistService],
  controllers: [ArtistController],
  exports: [TypeOrmModule],
})
export class ArtistModule {}
