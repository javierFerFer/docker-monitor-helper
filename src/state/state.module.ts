import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  providers: [StateService],
  exports: [StateService],
  imports: [
    LoggerModule.register({
      name: StateService.name,
    }),
  ],
})
export class StateModule {}
