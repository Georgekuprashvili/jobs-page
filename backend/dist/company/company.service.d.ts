import { Model } from 'mongoose';
import { Company } from './schemas/company.schema';
export declare class CompanyService {
    private companyModel;
    constructor(companyModel: Model<Company>);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Company, {}> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Company, {}> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
