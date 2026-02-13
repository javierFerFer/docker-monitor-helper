import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  providers: [MailService],
  exports: [MailService],
  imports: [
    LoggerModule.register({
      name: MailService.name,
    }),
  ],
})
export class MailModule {}
