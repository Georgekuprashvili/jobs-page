import { Model } from 'mongoose';
import { Vacancy } from './schemas/vacancy.schema';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
export declare class VacancyService {
    private vacancyModel;
    constructor(vacancyModel: Model<Vacancy>);
    create(dto: CreateVacancyDto, companyId: string): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    findApproved(page?: number, limit?: number): Promise<{
        data: (import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    approve(id: string): Promise<(import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null | undefined>;
    findWithFilters(query: any): Promise<(import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findById(id: string): Promise<(import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    findByCompany(companyId: string): Promise<(import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    delete(id: string): Promise<(import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
import { Schema } from 'mongoose';
export declare const VacancySchema: Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title?: string | null | undefined;
    description?: string | null | undefined;
    category?: string | null | undefined;
    location?: string | null | undefined;
    salary?: number | null | undefined;
    companyId?: string | null | undefined;
    approved?: boolean | null | undefined;
    companyName?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title?: string | null | undefined;
    description?: string | null | undefined;
    category?: string | null | undefined;
    location?: string | null | undefined;
    salary?: number | null | undefined;
    companyId?: string | null | undefined;
    approved?: boolean | null | undefined;
    companyName?: string | null | undefined;
}>, {}> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title?: string | null | undefined;
    description?: string | null | undefined;
    category?: string | null | undefined;
    location?: string | null | undefined;
    salary?: number | null | undefined;
    companyId?: string | null | undefined;
    approved?: boolean | null | undefined;
    companyName?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
