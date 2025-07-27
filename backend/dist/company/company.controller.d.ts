import { CompanyService } from './company.service';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/company.schema").Company, {}> & import("./schemas/company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/company.schema").Company, {}> & import("./schemas/company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
