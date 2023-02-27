import { Injectable, ConsoleLogger, Scope } from '@nestjs/common';
import { Log } from './types';

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  // error(message: unknown): void {
  //   console.log(message);
  // }
  // log(message: unknown): void {
  //   console.log(message);
  // }
}
