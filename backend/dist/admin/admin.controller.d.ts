import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    approveCompany(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../company/schemas/company.schema").Company, {}> & import("../company/schemas/company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../company/schemas/company.schema").Company, {}> & import("../company/schemas/company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("../company/schemas/company.schema").Company, "findOneAndUpdate", {}>;
    banCompany(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../company/schemas/company.schema").Company, {}> & import("../company/schemas/company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../company/schemas/company.schema").Company, {}> & import("../company/schemas/company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("../company/schemas/company.schema").Company, "findOneAndUpdate", {}>;
    approveVacancy(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../vacancy/schemas/vacancy.schema").Vacancy, {}> & import("../vacancy/schemas/vacancy.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../vacancy/schemas/vacancy.schema").Vacancy, {}> & import("../vacancy/schemas/vacancy.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("../vacancy/schemas/vacancy.schema").Vacancy, "findOneAndUpdate", {}>;
    rejectVacancy(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("../vacancy/schemas/vacancy.schema").Vacancy, {}> & import("../vacancy/schemas/vacancy.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("../vacancy/schemas/vacancy.schema").Vacancy, {}> & import("../vacancy/schemas/vacancy.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("../vacancy/schemas/vacancy.schema").Vacancy, "findOneAndDelete", {}>;
    getPendingCompanies(): Promise<(import("mongoose").Document<unknown, {}, import("../company/schemas/company.schema").Company, {}> & import("../company/schemas/company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getPendingVacancies(): Promise<(import("mongoose").Document<unknown, {}, import("../vacancy/schemas/vacancy.schema").Vacancy, {}> & import("../vacancy/schemas/vacancy.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}
