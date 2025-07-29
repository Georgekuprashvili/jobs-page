"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSenderService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
let EmailSenderService = class EmailSenderService {
    mailerService;
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendText(to, subject, content) {
        return this.mailerService.sendMail({
            to,
            from: 'Jobs.ge <noreply@jobspage.com>',
            subject,
            text: content,
        });
    }
    async sendHtmlToSomeone(to, subject, content, token) {
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
    async sendOTP(to, otpCode) {
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
};
exports.EmailSenderService = EmailSenderService;
exports.EmailSenderService = EmailSenderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailSenderService);
//# sourceMappingURL=email-sender.service.js.map