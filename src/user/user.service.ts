import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: InMemoryDBService<UserEntity>) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.getAll();
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = this.userRepository.get(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
