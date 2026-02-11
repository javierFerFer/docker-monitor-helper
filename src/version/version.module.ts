import { Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  providers: [VersionService],
  exports: [VersionService],
  imports: [
    LoggerModule.register({
      name: VersionService.name,
    }),
  ],
})
export class VersionModule {}
