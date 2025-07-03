import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class DefaultLogger extends ConsoleLogger {
  warn(message: any, ...rest: unknown[]) {
    console.log('___WARN LOG ___');
    super.warn(message, ...rest);
  }

  error(message: unknown, ...rest: unknown[]) {
    console.log('___ERROR LOG ___');
    super.error(message, ...rest);
  }
}
