import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailSenderService {
  constructor(private mailerService: MailerService) {}

  async sendText(to: string, subject: string, content: string) {
    return this.mailerService.sendMail({
      to,
      from: 'Jobs.ge <noreply@jobspage.com>',
      subject,
      text: content,
    });
  }

  async sendHtmlToSomeone(
    to: string,
    subject: string,
    content: string,
    token?: string,
  ) {
    return this.mailerService.sendMail({
      to,
      from: 'Jobs.ge <noreply@jobspage.com>',
      subject,
      html: `
        <h1 style="color:#4CAF50">New Message</h1>
        <p>${content}</p>
        ${token ? `<a href="${process.env.FRONT_URL}/activate?token=${token}">Activate</a>` : ''}
      `,
    });
  }

  async sendOTP(to: string, otpCode: string) {
    return this.mailerService.sendMail({
      to,
      from: 'Jobs.ge <noreply@jobspage.com>',
      subject: 'Your OTP Code',
      html: `
        <div style="font-size:18px; padding:10px; background:#f4f4f4; border-radius:6px;">
          Your verification code is:
          <strong style="font-size:28px; color:#2d89ef;">${otpCode}</strong>
        </div>
      `,
    });
  }
}
