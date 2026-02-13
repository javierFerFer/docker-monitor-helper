import { Injectable } from '@nestjs/common';
import Docker from 'dockerode';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class DockerService {
  constructor(private readonly logger: LoggerService) {}

  private docker = new Docker({
    socketPath: '/var/run/docker.sock',
  });

  async listContainers() {
    try {
      return this.docker.listContainers({ all: true });
    } catch (error) {
      this.logger.error('trying to get the list of container', error);
      throw error;
    }
  }
}
