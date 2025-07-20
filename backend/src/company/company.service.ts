import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Company } from './schemas/company.schema';

@Injectable()
export class CompanyService {
  constructor(@InjectModel('Company') private companyModel: Model<Company>) {}

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid ID');
    const company = await this.companyModel.findById(id);
    if (!company) throw new BadRequestException('Company not found');
    return company;
  }
}
