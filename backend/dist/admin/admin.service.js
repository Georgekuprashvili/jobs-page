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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AdminService = class AdminService {
    companyModel;
    vacancyModel;
    constructor(companyModel, vacancyModel) {
        this.companyModel = companyModel;
        this.vacancyModel = vacancyModel;
    }
    approveCompany(id) {
        return this.companyModel.findByIdAndUpdate(id, { approved: true }, { new: true });
    }
    banCompany(id) {
        return this.companyModel.findByIdAndUpdate(id, { approved: false }, { new: true });
    }
    approveVacancy(id) {
        return this.vacancyModel.findByIdAndUpdate(id, { approved: true }, { new: true });
    }
    rejectVacancy(id) {
        return this.vacancyModel.findByIdAndDelete(id);
    }
    async getPendingCompanies() {
        return this.companyModel.find({ approved: false });
    }
    async getPendingVacancies() {
        return this.vacancyModel.find({ approved: false });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Company')),
    __param(1, (0, mongoose_1.InjectModel)('Vacancy')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AdminService);
//# sourceMappingURL=admin.service.js.map