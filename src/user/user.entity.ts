import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

import { hash } from 'bcrypt';

export class UserEntity implements InMemoryDBEntity {
  id: string;

  login: string;

  password: string;

  version: number; // integer number, increments on update

  createdAt: number; // timestamp of creation

  updatedAt: number; // timestamp of last update

  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
