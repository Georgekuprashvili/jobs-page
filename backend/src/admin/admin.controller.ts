import { Controller, Get, Patch, Param, Delete } from '@nestjs/common';
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

  @Patch('approve-vacancy/:id')
  approveVacancy(@Param('id') id: string) {
    return this.adminService.approveVacancy(id);
  }

  @Delete('reject-vacancy/:id')
  rejectVacancy(@Param('id') id: string) {
    return this.adminService.rejectVacancy(id);
  }

  @Get('companies')
  getPendingCompanies() {
    return this.adminService.getPendingCompanies();
  }

  @Get('vacancies')
  getPendingVacancies() {
    return this.adminService.getPendingVacancies();
  }
}
