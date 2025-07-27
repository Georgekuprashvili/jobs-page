import { EmailSenderService } from './email-sender.service';
export declare class EmailUploadController {
    private readonly emailService;
    constructor(emailService: EmailSenderService);
    uploadAndSend(file: Express.Multer.File, body: {
        userEmail: string;
        companyEmail: string;
    }): Promise<{
        message: string;
    }>;
}
