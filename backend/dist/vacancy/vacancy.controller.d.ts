import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
export declare class VacancyController {
    private readonly vacancyService;
    constructor(vacancyService: VacancyService);
    create(req: any, dto: CreateVacancyDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/vacancy.schema").Vacancy, {}> & import("./schemas/vacancy.schema").Vacancy & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    findApproved(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/vacancy.schema").Vacancy, {}> & import("./schemas/vacancy.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findWithFilters(query: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/vacancy.schema").Vacancy, {}> & import("./schemas/vacancy.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    approve(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/vacancy.schema").Vacancy, {}> & import("./schemas/vacancy.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null | undefined>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/vacancy.schema").Vacancy, {}> & import("./schemas/vacancy.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/vacancy.schema").Vacancy, {}> & import("./schemas/vacancy.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getByCompany(companyId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/vacancy.schema").Vacancy, {}> & import("./schemas/vacancy.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    deleteVacancy(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/vacancy.schema").Vacancy, {}> & import("./schemas/vacancy.schema").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
