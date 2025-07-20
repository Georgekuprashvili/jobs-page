import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';


@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  apply(@Body() dto: CreateApplicationDto) {
    return this.applicationService.apply(dto);
  }

  @Get()
  findAll() {
    return this.applicationService.findAll();
  }
}
