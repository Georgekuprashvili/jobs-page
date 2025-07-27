import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailSenderService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendText(to: string, subject: string, content: string): Promise<any>;
    sendHtmlToSomeone(to: string, subject: string, content: string, token?: string): Promise<any>;
    sendOTP(to: string, otpCode: string): Promise<any>;
}
