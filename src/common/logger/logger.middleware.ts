import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {
    this.logger.setContext('HTTP');
  }

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, body, params, path } = request;
      const { statusCode } = response;

      const message = `
      method: ${method}
      url: ${path}
      params: ${JSON.stringify(params)}
      code: ${statusCode}
      ${method === 'POST' ? `body: ${JSON.stringify(body)}` : ''}`;

      if (statusCode >= 500) {
        return this.logger.error(message);
      }

      if (statusCode >= 400) {
        return this.logger.warn(message);
      }

      return this.logger.log(message);
    });

    next();
  }
}
