import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { AlbumEntity } from './album.entity';

@Injectable()
export class AlbumRepository extends InMemoryDBService<AlbumEntity> {}
