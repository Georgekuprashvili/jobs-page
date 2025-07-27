import { Document } from 'mongoose';
export declare class Otp extends Document {
    email: string;
    code: number;
    expiresAt: Date;
}
export declare const OtpSchema: import("mongoose").Schema<Otp, import("mongoose").Model<Otp, any, any, any, Document<unknown, any, Otp, any> & Otp & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Otp, Document<unknown, {}, import("mongoose").FlatRecord<Otp>, {}> & import("mongoose").FlatRecord<Otp> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
