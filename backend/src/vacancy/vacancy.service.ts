import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Vacancy } from './schemas/vacancy.schema';
import { CreateVacancyDto } from './dto/create-vacancy.dto';

@Injectable()
export class VacancyService {
  constructor(@InjectModel('Vacancy') private vacancyModel: Model<Vacancy>) {}

  async create(dto: CreateVacancyDto, companyId: string) {
    const created = await this.vacancyModel.create({
      ...dto,
      companyId,
      companyEmail: dto.companyEmail,
      approved: false,
    });
    return { message: 'Vacancy created, pending approval', data: created };
  }

  async findApproved(page = 1, limit = 6) {
    const skip = (page - 1) * limit;

    const vacancies = await this.vacancyModel
      .find({ approved: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await this.vacancyModel.countDocuments({ approved: true });

    return {
      data: vacancies,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async approve(id: string) {
    if (!isValidObjectId(id)) return;
    return this.vacancyModel.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true },
    );
  }

  async findWithFilters(query: any) {
    const filters: any = { approved: true };

    if (query.search) {
      filters.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
      ];
    }

    if (query.category) filters.category = query.category;
    if (query.location) filters.location = query.location;

    if (query.salaryFrom || query.salaryTo) {
      filters.salary = {};
      if (query.salaryFrom) filters.salary.$gte = Number(query.salaryFrom);
      if (query.salaryTo) filters.salary.$lte = Number(query.salaryTo);
    }

    return this.vacancyModel.find(filters).sort({ createdAt: -1 }).limit(50);
  }

  async findAll() {
    return this.vacancyModel.find();
  }

  async findById(id: string) {
    if (!isValidObjectId(id)) return null;
    return this.vacancyModel.findById(id);
  }
  async findByCompany(companyId: string) {
    return this.vacancyModel.find({ companyId }).sort({ createdAt: -1 });
  }
  async delete(id: string) {
    return this.vacancyModel.findByIdAndDelete(id);
  }
}

import { Schema } from 'mongoose';

export const VacancySchema = new Schema(
  {
    title: String,
    description: String,
    location: String,
    salary: Number,
    category: String,
    companyId: String,
    companyName: String,
    approved: Boolean,
  },
  {
    timestamps: true,
  },
);
