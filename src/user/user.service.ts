import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as INFO from '../constants';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UserEntity } from './user.entity';
import { INCORRECT_PASSWORD_ERROR } from './constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(INFO.NOT_FOUND_ERROR);
    }

    return user;
  }

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    return this.userRepository.save(newUser);
  }

  async updatePassword(
    id: string,
    body: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.getById(id);

    const isMatchPassword = await compare(body.oldPassword, user.password);

    if (!isMatchPassword) {
      throw new ForbiddenException(INCORRECT_PASSWORD_ERROR);
    }

    Object.assign(user, { password: body.newPassword });
    return this.userRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.getById(id);

    return this.userRepository.delete(user.id);
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const token = await hash(refreshToken, 10);
    await this.userRepository.update(userId, {
      refreshToken: token,
    });
  }
}
