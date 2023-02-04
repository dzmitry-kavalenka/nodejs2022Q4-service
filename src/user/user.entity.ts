import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

export class UserEntity implements InMemoryDBEntity {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor({ password, login }) {
    this.password = password;
    this.login = login;
    this.id = uuidV4();
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  updateVersion() {
    this.version += 1;
  }

  updateUpdatedAt() {
    this.updatedAt = Date.now();
  }
}
