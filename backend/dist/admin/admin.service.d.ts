import { Company } from '../company/schemas/company.schema';
import { Vacancy } from '../vacancy/schemas/vacancy.schema';
import { Model } from 'mongoose';
export declare class AdminService {
    private companyModel;
    private vacancyModel;
    constructor(companyModel: Model<Company>, vacancyModel: Model<Vacancy>);
    approveCompany(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Company, {}> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Company, {}> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Company, "findOneAndUpdate", {}>;
    banCompany(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Company, {}> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Company, {}> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Company, "findOneAndUpdate", {}>;
    approveVacancy(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Vacancy, "findOneAndUpdate", {}>;
    rejectVacancy(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Vacancy, "findOneAndDelete", {}>;
    getPendingCompanies(): Promise<(import("mongoose").Document<unknown, {}, Company, {}> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getPendingVacancies(): Promise<(import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}
