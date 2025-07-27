export declare class Company {
    companyName: string;
    email: string;
    password: string;
    phoneNumber: number;
    approved: boolean;
    verified: boolean;
}
export declare const CompanySchema: import("mongoose").Schema<Company, import("mongoose").Model<Company, any, any, any, import("mongoose").Document<unknown, any, Company, any> & Company & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Company, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Company>, {}> & import("mongoose").FlatRecord<Company> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
