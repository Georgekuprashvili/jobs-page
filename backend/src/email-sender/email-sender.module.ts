import { Module } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';
import { EmailUploadController } from './email-upload.controller';

@Module({
  controllers: [EmailUploadController],
  providers: [EmailSenderService],
  exports: [EmailSenderService],
})
export class EmailSenderModule {}
