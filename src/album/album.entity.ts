import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class AlbumEntity implements InMemoryDBEntity {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
