import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmailSenderService } from './email-sender.service';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Controller('email')
export class EmailUploadController {
  constructor(private readonly emailService: EmailSenderService) {}

  @Post('send-cv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAndSend(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { userEmail: string; companyEmail: string },
  ) {
    const s3 = new S3({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const key = `cvs/${uuidv4()}-${file.originalname}`;

    await s3
      .putObject({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();

    const url = s3.getSignedUrl('getObject', {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Expires: 60 * 1440,
    });

    await this.emailService.sendHtmlToSomeone(
      body.companyEmail,
      'მომხმარებელმა გამოგიგზავნა რეზიუმე',
      `მომხმარებლის ელ.ფოსტა: ${body.userEmail}<br/>CV ფაილი: <a href="${url}" target="_blank">გადმოწერე</a>`,
    );

    return { message: 'რეზიუმე გაიგზავნა წარმატებით' };
  }
}
