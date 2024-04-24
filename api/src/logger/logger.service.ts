import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
  constructor(context: string) {
    super(context);
  }

  setContext(context: string) {
    this.context = context;
  }

  log(message: string) {
    super.log(message);
  }

  error(message: string) {
    super.error(message);
  }

  warning(message: string) {
    super.warn(message);
  }

  debug(message: string) {
    super.debug(message);
  }

  verbose(message: string) {
    super.log(message);
  }
}
