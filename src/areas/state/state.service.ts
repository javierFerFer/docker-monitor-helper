import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

const STATE_FILE = 'state.json';

@Injectable()
export class StateService {
  load(): Record<string, string> {
    if (!fs.existsSync(STATE_FILE)) return {};
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8'));
  }

  save(state: Record<string, string>) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  }
}
