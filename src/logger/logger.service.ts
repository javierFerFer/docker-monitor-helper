import { Inject, Injectable, Logger } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './logger.definition';
import type { LoggerModuleOptions } from './logger.options';

@Injectable()
export class LoggerService {
  private readonly logger: Logger;
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private options: LoggerModuleOptions,
  ) {
    this.logger = new Logger(this.options.name);
  }

  public log(text: string) {
    this.logger.log(text);
  }
}
