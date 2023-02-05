import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { Exclude } from 'class-transformer';
import { hash } from 'bcrypt';

export class UserEntity implements InMemoryDBEntity {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  async hashPassword(password: string) {
    this.password = await hash(password, 10);
    this.updateVersion();
  }

  private updateVersion() {
    this.version += 1;
    this.updateUpdatedAt();
  }

  private updateUpdatedAt() {
    this.updatedAt = Date.now();
  }
}
