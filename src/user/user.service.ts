import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: InMemoryDBService<UserEntity>) {}

  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.getAll();
  }

  async getById(id: string): Promise<UserEntity> {
    const user = this.userRepository.get(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(body: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity({
      password: body.password,
      login: body.login,
    });

    await newUser.hashPassword();

    const user = this.userRepository.create(newUser);
    delete user.password;

    return user;
  }
}
