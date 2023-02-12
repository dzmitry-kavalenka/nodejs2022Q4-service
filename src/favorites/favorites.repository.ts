import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { FavoritesEntity } from './favorites.entity';

@Injectable()
export class FavoritesRepository extends InMemoryDBService<FavoritesEntity> {}
