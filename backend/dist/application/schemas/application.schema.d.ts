export declare class Application {
    userId: string;
    vacancyId: string;
    cvUrl: string;
}
export declare const ApplicationSchema: import("mongoose").Schema<Application, import("mongoose").Model<Application, any, any, any, import("mongoose").Document<unknown, any, Application, any> & Application & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Application, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Application>, {}> & import("mongoose").FlatRecord<Application> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
