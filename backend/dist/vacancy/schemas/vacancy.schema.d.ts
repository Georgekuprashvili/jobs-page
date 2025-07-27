import mongoose from 'mongoose';
export declare class Vacancy {
    title: string;
    description: string;
    category: string;
    location: string;
    salary: number;
    companyEmail: string;
    companyId: string;
    approved: boolean;
}
export declare const VacancySchema: mongoose.Schema<Vacancy, mongoose.Model<Vacancy, any, any, any, mongoose.Document<unknown, any, Vacancy, any> & Vacancy & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Vacancy, mongoose.Document<unknown, {}, mongoose.FlatRecord<Vacancy>, {}> & mongoose.FlatRecord<Vacancy> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
