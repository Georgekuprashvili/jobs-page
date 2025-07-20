import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from '../company/schemas/company.schema';
import { Model } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(@InjectModel('Company') private companyModel: Model<Company>) {}

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
}
