import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: config.get('SMTP_HOST'),
      port: Number(config.get('SMTP_PORT')),
      secure: false,
      auth: {
        user: config.get('SMTP_USER'),
        pass: config.get('SMTP_PASS'),
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
