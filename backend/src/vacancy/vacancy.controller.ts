import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { IsAuthGuard } from '../auth/guards/isAuth.guard';

@Controller('vacancies')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @UseGuards(IsAuthGuard)
  @Post()
  create(@Req() req, @Body() dto: CreateVacancyDto) {
    return this.vacancyService.create(dto, req.user.id);
  }
  @Get('approved')
  findApproved(@Query('page') page: string, @Query('limit') limit: string) {
    return this.vacancyService.findApproved(
      Number(page) || 1,
      Number(limit) || 6,
    );
  }

  @Get()
  findWithFilters(@Query() query: any) {
    return this.vacancyService.findWithFilters(query);
  }

  @Patch('approve/:id')
  approve(@Param('id') id: string) {
    return this.vacancyService.approve(id);
  }

  @Get('all')
  findAll() {
    return this.vacancyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vacancyService.findById(id);
  }
  @Get('company/:companyId')
  async getByCompany(@Param('companyId') companyId: string) {
    return this.vacancyService.findByCompany(companyId);
  }
  @Delete(':id')
  async deleteVacancy(@Param('id') id: string) {
    return this.vacancyService.delete(id);
  }
}
