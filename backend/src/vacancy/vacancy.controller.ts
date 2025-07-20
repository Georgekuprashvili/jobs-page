import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';


@Controller('vacancies')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Post()
  create(@Body() dto: CreateVacancyDto) {
    return this.vacancyService.create(dto);
  }

  @Get('approved')
  findApproved() {
    return this.vacancyService.findApproved();
  }

  @Patch('approve/:id')
  approve(@Param('id') id: string) {
    return this.vacancyService.approve(id);
  }
}
