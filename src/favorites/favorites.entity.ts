import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class FavoritesEntity implements InMemoryDBEntity {
  id: string; // to be able to use InMemoryDBEntity

  artists: string[];
  albums: string[];
  tracks: string[];

  constructor(partial: Partial<FavoritesEntity>) {
    Object.assign(this, partial);
  }
}
