import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { DockerModule } from '../docker/docker.module';
import { MailModule } from '../mail/mail.module';
import { StateModule } from '../state/state.module';

@Module({
  imports: [DockerModule, MailModule, StateModule],
  providers: [MonitorService],
})
export class MonitorModule {}
