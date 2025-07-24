import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from '../company/schemas/company.schema';
import { Vacancy } from '../vacancy/schemas/vacancy.schema';
import { Model } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Company') private companyModel: Model<Company>,
    @InjectModel('Vacancy') private vacancyModel: Model<Vacancy>,
  ) {}

  approveCompany(id: string) {
    return this.companyModel.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true },
    );
  }

  banCompany(id: string) {
    return this.companyModel.findByIdAndUpdate(
      id,
      { approved: false },
      { new: true },
    );
  }

  approveVacancy(id: string) {
    return this.vacancyModel.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true },
    );
  }

  rejectVacancy(id: string) {
    return this.vacancyModel.findByIdAndDelete(id);
  }

  async getPendingCompanies() {
    return this.companyModel.find({ approved: false });
  }

  async getPendingVacancies() {
    return this.vacancyModel.find({ approved: false });
  }
}
