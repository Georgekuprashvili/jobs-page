import { Controller, Patch, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('approve-company/:id')
  approveCompany(@Param('id') id: string) {
    return this.adminService.approveCompany(id);
  }

  @Patch('ban-company/:id')
  banCompany(@Param('id') id: string) {
    return this.adminService.banCompany(id);
  }
}
