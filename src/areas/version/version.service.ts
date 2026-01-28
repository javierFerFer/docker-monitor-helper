import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

const APP_VERSION = '0.0.3';
@Injectable()
export class VersionService implements OnModuleInit {
  private readonly logger = new Logger(VersionService.name);

  onModuleInit() {
    this.logger.log(`version number: ${APP_VERSION}`);
  }
}
