"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailUploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const email_sender_service_1 = require("./email-sender.service");
const aws_sdk_1 = require("aws-sdk");
const uuid_1 = require("uuid");
let EmailUploadController = class EmailUploadController {
    emailService;
    constructor(emailService) {
        this.emailService = emailService;
    }
    async uploadAndSend(file, body) {
        const s3 = new aws_sdk_1.S3({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEYS,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
        const key = `cvs/${(0, uuid_1.v4)()}-${file.originalname}`;
        await s3
            .putObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        })
            .promise();
        const url = s3.getSignedUrl('getObject', {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Expires: 60 * 1440,
        });
        await this.emailService.sendHtmlToSomeone(body.companyEmail, 'მომხმარებელმა გამოგიგზავნა რეზიუმე', `მომხმარებლის ელ.ფოსტა: ${body.userEmail}<br/>CV ფაილი: <a href="${url}" target="_blank">გადმოწერე</a>`);
        return { message: 'რეზიუმე გაიგზავნა წარმატებით' };
    }
};
exports.EmailUploadController = EmailUploadController;
__decorate([
    (0, common_1.Post)('send-cv'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmailUploadController.prototype, "uploadAndSend", null);
exports.EmailUploadController = EmailUploadController = __decorate([
    (0, common_1.Controller)('email'),
    __metadata("design:paramtypes", [email_sender_service_1.EmailSenderService])
], EmailUploadController);
//# sourceMappingURL=email-upload.controller.js.map