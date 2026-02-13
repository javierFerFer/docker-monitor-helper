import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { DockerModule } from '../docker/docker.module';
import { MailModule } from '../mail/mail.module';
import { StateModule } from '../state/state.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    DockerModule,
    MailModule,
    StateModule,
    LoggerModule.register({
      name: MonitorService.name,
    }),
  ],
  providers: [MonitorService],
})
export class MonitorModule {}
