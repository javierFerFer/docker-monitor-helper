import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const STATE_DIR = 'state';
const STATE_FILE = path.join(STATE_DIR, 'state.json');

@Injectable()
export class StateService implements OnModuleInit {
  onModuleInit() {
    this.ensureStateFile();
  }

  private ensureStateFile() {
    if (!fs.existsSync(STATE_DIR)) {
      fs.mkdirSync(STATE_DIR, { recursive: true });
    }

    // Create file if it doesn't exist
    if (!fs.existsSync(STATE_FILE)) {
      fs.writeFileSync(STATE_FILE, '{}', 'utf-8');
    }
  }

  load(): Record<string, string> {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
  }

  save(state: Record<string, string>) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
  }
}
