import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DockerService } from '../docker/docker.service';
import { MailService } from '../mail/mail.service';
import { StateService } from '../state/state.service';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class MonitorService {
  constructor(
    private docker: DockerService,
    private mail: MailService,
    private state: StateService,
    private readonly logger: LoggerService,
  ) {}

  @Cron('*/30 * * * * *') // every 30 seconds
  async checkContainers() {
    try {
      const prev = this.state.load();
      const containers = await this.docker.listContainers();
      const current: Record<string, string> = {};

      for (const c of containers) {
        const name = c.Names[0].replace('/', '');
        const state = c.State;

        current[name] = state;

        if (prev[name] === 'running' && state !== 'running') {
          await this.mail.sendContainerDown(name, state);
        }
      }

      this.state.save(current);
    } catch (error) {
      this.logger.error('trying to check container', error);
    }
  }
}
