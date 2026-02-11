import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';

const APP_VERSION = '0.0.3';
@Injectable()
export class VersionService implements OnModuleInit {
  constructor(private readonly logger: LoggerService) {}

  onModuleInit() {
    this.logger.log(`version number: ${APP_VERSION}`);
  }
}
