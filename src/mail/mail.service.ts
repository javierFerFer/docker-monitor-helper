import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class MailService implements OnModuleInit {
  private transporter;

  constructor(
    private config: ConfigService,
    private readonly logger: LoggerService,
  ) {}
  onModuleInit() {
    try {
      this.transporter = nodemailer.createTransport({
        host: this.config.get('SMTP_HOST'),
        port: Number(this.config.get('SMTP_PORT')),
        secure: false,
        auth: {
          user: this.config.get('SMTP_USER'),
          pass: this.config.get('SMTP_PASS'),
        },
      });
    } catch (error) {
      this.logger.error(
        'trying to connect with the transport to send the email',
        error,
      );
    }
  }

  async sendContainerDown(name: string, state: string) {
    try {
      await this.transporter.sendMail({
        from: this.config.get('EMAIL_FROM'),
        to: this.config.get('EMAIL_TO'),
        subject: `❌ Contenedor caído: ${name}`,
        text: `El contenedor "${name}" está en estado: ${state}`,
      });
    } catch (error) {
      this.logger.error('trying to send the email of error', error);
      throw error;
    }
  }
}
