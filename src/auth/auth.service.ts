import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { UserEntity } from '@app/user/user.entity';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { TokensResponse } from 'swagger/entities/auth';
import { WROND_CREDENTIALS } from './constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login(loginUserDto: CreateUserDto): Promise<TokensResponse> {
    const userByLogin = await this.userRepository.findOneBy({
      login: loginUserDto.login,
    });

    if (!userByLogin) {
      throw new ForbiddenException(WROND_CREDENTIALS);
    }

    const isMatchPassword = await compare(
      loginUserDto.password,
      userByLogin.password,
    );

    if (!isMatchPassword) {
      throw new ForbiddenException(WROND_CREDENTIALS);
    }

    return { access_token: this.generateJWT(userByLogin) };
  }

  generateJWT(user: UserEntity): string {
    return sign(
      {
        userId: user.id,
        login: user.login,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 60 * 60 },
    );
  }
}
