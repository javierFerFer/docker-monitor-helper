import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService implements OnModuleInit {
  private transporter;

  constructor(private config: ConfigService) {}
  onModuleInit() {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('SMTP_HOST'),
      port: Number(this.config.get('SMTP_PORT')),
      secure: false,
      auth: {
        user: this.config.get('SMTP_USER'),
        pass: this.config.get('SMTP_PASS'),
      },
    });
  }

  async sendContainerDown(name: string, state: string) {
    await this.transporter.sendMail({
      from: this.config.get('EMAIL_FROM'),
      to: this.config.get('EMAIL_TO'),
      subject: `❌ Contenedor caído: ${name}`,
      text: `El contenedor "${name}" está en estado: ${state}`,
    });
  }
}
