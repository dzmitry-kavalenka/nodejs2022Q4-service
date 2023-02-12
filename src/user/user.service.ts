import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import * as INFO from '../constants';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UserEntity } from './user.entity';
import { INCORRECT_PASSWORD_ERROR } from './constants';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: InMemoryDBService<UserEntity>) {}

  async getAll(): Promise<UserEntity[]> {
    const users = this.userRepository.getAll();

    return users.map((user) => this.buildResponse(user));
  }

  async getById(id: string): Promise<UserEntity> {
    const user = this.userRepository.get(id);

    if (!user) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    return this.buildResponse(user);
  }

  async create(body: CreateUserDto): Promise<UserEntity> {
    const timestamp = Date.now();

    const newUser = new UserEntity({
      id: uuidV4(),
      login: body.login,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    await newUser.hashPassword(body.password);

    const user = this.userRepository.create(newUser);
    return this.buildResponse(user);
  }

  async updatePassword(
    id: string,
    body: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = this.userRepository.get(id);

    if (!user) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    const isMatchPassword = await compare(body.oldPassword, user.password);

    if (!isMatchPassword) {
      throw new ForbiddenException(INCORRECT_PASSWORD_ERROR);
    }

    const updatedUser = new UserEntity(user);
    await updatedUser.hashPassword(body.newPassword);
    updatedUser.updateVersion();

    this.userRepository.update(updatedUser);
    return updatedUser;
  }

  async delete(id: string) {
    const user = this.userRepository.get(id);

    if (!user) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    return this.userRepository.delete(id);
  }

  buildResponse(user: UserEntity) {
    return new UserEntity(user);
  }
}
