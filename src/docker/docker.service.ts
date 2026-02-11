import { Injectable } from '@nestjs/common';
import Docker from 'dockerode';

@Injectable()
export class DockerService {
  private docker = new Docker({
    socketPath: '/var/run/docker.sock',
  });

  async listContainers() {
    return this.docker.listContainers({ all: true });
  }
}
