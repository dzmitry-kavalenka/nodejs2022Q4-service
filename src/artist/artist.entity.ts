import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export class ArtistEntity implements InMemoryDBEntity {
  id: string;
  name: string;
  grammy: boolean;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
