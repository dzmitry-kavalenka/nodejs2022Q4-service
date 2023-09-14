import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { TokensResponse } from '../../swagger/entities/auth';
import { UserEntity } from '../user/user.entity';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { WROND_CREDENTIALS, WRONG_TOKEN } from './constants';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { JWTPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login(
    loginUserDto: CreateUserDto,
  ): Promise<TokensResponse & { userId: string }> {
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

    return {
      accessToken: this.generateAccessJWT(userByLogin),
      refreshToken: this.generateRefreshJWT(userByLogin),
      userId: userByLogin.id,
    };
  }

  async refresh({ refreshToken }: RefreshTokenDto): Promise<TokensResponse> {
    try {
      const decode = verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH_KEY,
      ) as JWTPayload;

      const user = await this.userRepository.findOneBy({ id: decode.userId });

      const isRefreshTokenMatching = await compare(
        refreshToken,
        user.refreshToken,
      );

      if (isRefreshTokenMatching) {
        return {
          accessToken: this.generateAccessJWT(user),
          refreshToken: this.generateRefreshJWT(user),
        };
      }
    } catch (error) {
      throw new ForbiddenException(WRONG_TOKEN);
    }
  }

  generateAccessJWT(user: UserEntity): string {
    return sign(
      {
        userId: user.id,
        login: user.login,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    );
  }

  generateRefreshJWT(user: UserEntity): string {
    return sign(
      {
        userId: user.id,
        login: user.login,
      },
      process.env.JWT_SECRET_REFRESH_KEY,
      { expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME },
    );
  }
}
