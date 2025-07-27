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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const mailer_1 = require("@nestjs-modules/mailer");
let AuthService = class AuthService {
    companyModel;
    userModel;
    otpModel;
    jwtService;
    mailerService;
    constructor(companyModel, userModel, otpModel, jwtService, mailerService) {
        this.companyModel = companyModel;
        this.userModel = userModel;
        this.otpModel = otpModel;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async signUpCompany(dto) {
        const exists = await this.companyModel.findOne({ email: dto.email });
        if (exists)
            throw new common_1.BadRequestException('Company already exists');
        dto.password = await bcrypt.hash(dto.password, 10);
        await this.companyModel.create(dto);
        await this.sendOtp(dto.email);
        return { message: 'Company registered. Please verify email.' };
    }
    async signUpUser(dto) {
        const exists = await this.userModel.findOne({ email: dto.email });
        if (exists)
            throw new common_1.BadRequestException('User already exists');
        dto.password = await bcrypt.hash(dto.password, 10);
        const isAdmin = dto.email === 'kuprashvilinini9@gmail.com';
        await this.userModel.create({
            ...dto,
            type: isAdmin ? 'admin' : 'user',
        });
        await this.sendOtp(dto.email);
        return { message: 'User registered. Please verify email.' };
    }
    async signInCompany(dto) {
        const company = await this.companyModel
            .findOne({ email: dto.email })
            .select('+password');
        if (!company || !(await bcrypt.compare(dto.password, company.password))) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        if (!company.verified) {
            return { message: 'verify email' };
        }
        const token = this.jwtService.sign({
            id: company._id.toString(),
            email: company.email,
            fullName: company.companyName,
            type: 'company',
        });
        return { token };
    }
    async signInUser(dto) {
        const user = await this.userModel
            .findOne({ email: dto.email })
            .select('+password');
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        if (!user.verified) {
            return { message: 'verify email' };
        }
        const token = this.jwtService.sign({
            id: user._id.toString(),
            email: user.email,
            fullName: user.fullName,
            type: user.type,
        });
        return { token };
    }
    async sendOtp(email) {
        const code = Math.floor(100000 + Math.random() * 900000);
        await this.otpModel.findOneAndUpdate({ email }, { code, expiresAt: new Date(Date.now() + 10 * 60 * 1000) }, { upsert: true });
        await this.mailerService.sendMail({
            to: email,
            subject: 'Your OTP Code',
            html: `<p>Your verification code is <b>${code}</b>. It will expire in 10 minutes.</p>`,
        });
    }
    async verifyEmail(dto) {
        const otp = await this.otpModel.findOne({ email: dto.email });
        if (!otp || otp.code !== dto.otpCode || otp.expiresAt < new Date()) {
            throw new common_1.BadRequestException('Invalid or expired OTP code');
        }
        await this.companyModel.updateOne({ email: dto.email }, { verified: true });
        await this.userModel.updateOne({ email: dto.email }, { verified: true });
        await this.otpModel.deleteOne({ email: dto.email });
        const user = await this.userModel.findOne({ email: dto.email }).lean();
        const company = await this.companyModel
            .findOne({ email: dto.email })
            .lean();
        if (!user && !company) {
            throw new common_1.BadRequestException('Verified user or company not found');
        }
        let tokenPayload;
        if (user) {
            tokenPayload = {
                id: user._id.toString(),
                email: user.email,
                fullName: user.fullName,
                type: user.type,
            };
        }
        else if (company) {
            tokenPayload = {
                id: company._id.toString(),
                email: company.email,
                fullName: company.companyName,
                type: 'company',
            };
        }
        else {
            throw new common_1.BadRequestException('Unexpected error');
        }
        const token = this.jwtService.sign(tokenPayload);
        return { token };
    }
    async resendOtp(email) {
        const user = await this.userModel.findOne({ email });
        const company = await this.companyModel.findOne({ email });
        if (!user && !company) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.sendOtp(email);
        return { message: 'OTP resent' };
    }
    async getCurrentCompany(id) {
        return this.companyModel.findById(id);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Company')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __param(2, (0, mongoose_1.InjectModel)('Otp')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService,
        mailer_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map