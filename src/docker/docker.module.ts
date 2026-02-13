import { Module } from '@nestjs/common';
import { DockerService } from './docker.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  providers: [DockerService],
  exports: [DockerService],
  imports: [
    LoggerModule.register({
      name: DockerService.name,
    }),
  ],
})
export class DockerModule {}
