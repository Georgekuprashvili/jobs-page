import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Vacancy } from './schemas/vacancy.schema';
import { CreateVacancyDto } from './dto/create-vacancy.dto';


@Injectable()
export class VacancyService {
  constructor(@InjectModel('Vacancy') private vacancyModel: Model<Vacancy>) {}

  async create(dto: CreateVacancyDto) {
    const created = await this.vacancyModel.create({ ...dto, approved: false });
    return { message: 'Vacancy created, pending approval', data: created };
  }

  async findApproved() {
    return this.vacancyModel.find({ approved: true });
  }

  async approve(id: string) {
    if (!isValidObjectId(id)) return;
    return this.vacancyModel.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true },
    );
  }
}
