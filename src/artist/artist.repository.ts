import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { ArtistEntity } from './artist.entity';

@Injectable()
export class ArtistRepository extends InMemoryDBService<ArtistEntity> {}
