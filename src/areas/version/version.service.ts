import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const DEFAULT_VERSION_NUMBER = '1.0.0';
@Injectable()
export class VersionService implements OnModuleInit {
  private readonly logger = new Logger(VersionService.name);
  constructor(private config: ConfigService) {}

  onModuleInit() {
    const versionApp = this.getVersionApp() || DEFAULT_VERSION_NUMBER;
    this.logger.log(`version number: ${versionApp}`);
  }

  private getVersionApp() {
    return this.config.get('APP_VERSION');
  }
}
