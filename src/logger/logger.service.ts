import { Injectable, ConsoleLogger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  error(message: unknown): void {
    console.log(message);
  }

  log(message: unknown): void {
    console.log(message);
  }
}
