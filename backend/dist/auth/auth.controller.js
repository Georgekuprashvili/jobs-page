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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const company_signin_dto_1 = require("./dto/company-signin.dto");
const isAuth_guard_1 = require("./guards/isAuth.guard");
const verify_email_dto_1 = require("./dto/verify-email.dto");
const sign_up_dto_1 = require("./dto/sign-up.dto");
const company_signup_dto_1 = require("./dto/company-signup.dto");
const sign_in_dto_1 = require("./dto/sign-in.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    signUpCompany(dto) {
        return this.authService.signUpCompany(dto);
    }
    signInCompany(dto) {
        return this.authService.signInCompany(dto);
    }
    signUpUser(dto) {
        return this.authService.signUpUser(dto);
    }
    signInUser(dto) {
        return this.authService.signInUser(dto);
    }
    verifyEmail(dto) {
        return this.authService.verifyEmail(dto);
    }
    resendCode(email) {
        return this.authService.resendOtp(email);
    }
    getCurrentCompany(req) {
        return this.authService.getCurrentCompany(req.companyId);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('company/sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_signup_dto_1.CompanySignupDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signUpCompany", null);
__decorate([
    (0, common_1.Post)('company/sign-in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_signin_dto_1.CompanySignInDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signInCompany", null);
__decorate([
    (0, common_1.Post)('user/sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.UserSignUpDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signUpUser", null);
__decorate([
    (0, common_1.Post)('user/sign-in'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.UserSignInDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signInUser", null);
__decorate([
    (0, common_1.Post)('verify-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_email_dto_1.VerifyEmailDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('resend-verification-code'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resendCode", null);
__decorate([
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuthGuard),
    (0, common_1.Get)('company/current'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getCurrentCompany", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map