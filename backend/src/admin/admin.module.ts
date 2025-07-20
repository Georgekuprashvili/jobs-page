import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CompanyModule } from 'src/company/company.module';


@Module({
    imports: [CompanyModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
