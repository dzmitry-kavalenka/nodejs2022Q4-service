import { verify } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@app/user/user.service';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { JWTPayload } from '../types';

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: ExpressRequestInterface, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];
    const jwtSecret = this.configService.get<string>('JWT_SECRET_KEY');

    try {
      const decode = verify(token, jwtSecret) as JWTPayload;

      const user = await this.userService.getById(decode.userId);
      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
