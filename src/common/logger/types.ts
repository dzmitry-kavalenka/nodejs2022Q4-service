import { LogLevel } from '@nestjs/common';

export interface Log {
  message: string;
  context: unknown;
  level: LogLevel;
}
