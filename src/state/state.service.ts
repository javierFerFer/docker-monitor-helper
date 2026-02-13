import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { LoggerService } from 'src/logger/logger.service';

const STATE_DIR = 'state';
const STATE_FILE = path.join(STATE_DIR, 'state.json');

@Injectable()
export class StateService implements OnModuleInit {
  constructor(private readonly logger: LoggerService) {}

  onModuleInit() {
    this.ensureStateFile();
  }

  private ensureStateFile() {
    try {
      if (!fs.existsSync(STATE_DIR)) {
        fs.mkdirSync(STATE_DIR, { recursive: true });
        this.logger.info('Folder for state was created');
      }

      // Create file if it doesn't exist
      if (!fs.existsSync(STATE_FILE)) {
        fs.writeFileSync(STATE_FILE, '{}', 'utf-8');
        this.logger.info('File for state was created');
      }
    } catch (error) {
      this.logger.error(
        'trying to create a file or folder to save state',
        error,
      );
    }
  }

  load(): Record<string, string> {
    try {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
    } catch (error) {
      this.logger.error('trying to read the state from file', error);
      throw error;
    }
  }

  save(state: Record<string, string>) {
    try {
      fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
    } catch (error) {
      this.logger.error('trying to save the state from file', error);
      throw error;
    }
  }
}
