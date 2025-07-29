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
      from: 'Jobs.ge <jobspage@gmail.com>',
      subject: 'Your OTP Code',
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 30px; border-radius: 10px; max-width: 500px; margin: auto; border: 1px solid #e0e0e0;">
        <h2 style="text-align: center; color: #2d89ef; margin-bottom: 20px;">Verify Your Email</h2>
        <p style="font-size: 16px; color: #333333; text-align: center;">
          Use the code below to verify your email address:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; font-size: 36px; letter-spacing: 8px; font-weight: bold; color: #2d89ef; padding: 15px 30px; background-color: #f0f8ff; border-radius: 8px;">
            ${otpCode}
          </span>
        </div>
        <p style="font-size: 14px; color: #777777; text-align: center;">
          This code will expire in 10 minutes. If you did not request this, please ignore this email.
        </p>
        <p style="font-size: 14px; color: #999999; text-align: center; margin-top: 30px;">
          &mdash; The Jobs.ge Team
        </p>
      </div>
    `,
    });
  }
}
