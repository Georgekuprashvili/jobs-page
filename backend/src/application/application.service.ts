import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application } from './schemas/application.schema';
import { CreateApplicationDto } from './dto/create-application.dto';


@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel('Application') private appModel: Model<Application>,
  ) {}

  async apply(dto: CreateApplicationDto) {
    const created = await this.appModel.create(dto);
    return { message: 'Application submitted', data: created };
  }

  async findAll() {
    return this.appModel.find();
  }
}
