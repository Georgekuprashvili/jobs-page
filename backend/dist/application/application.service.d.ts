import { Model } from 'mongoose';
import { Application } from './schemas/application.schema';
import { CreateApplicationDto } from './dto/create-application.dto';
export declare class ApplicationService {
    private appModel;
    constructor(appModel: Model<Application>);
    apply(dto: CreateApplicationDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, Application, {}> & Application & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Application, {}> & Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}
