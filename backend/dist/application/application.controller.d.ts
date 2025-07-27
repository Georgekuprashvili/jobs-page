import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
export declare class ApplicationController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    apply(dto: CreateApplicationDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schemas/application.schema").Application, {}> & import("./schemas/application.schema").Application & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/application.schema").Application, {}> & import("./schemas/application.schema").Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
}
