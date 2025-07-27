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
exports.VacancyController = void 0;
const common_1 = require("@nestjs/common");
const vacancy_service_1 = require("./vacancy.service");
const create_vacancy_dto_1 = require("./dto/create-vacancy.dto");
const isAuth_guard_1 = require("../auth/guards/isAuth.guard");
let VacancyController = class VacancyController {
    vacancyService;
    constructor(vacancyService) {
        this.vacancyService = vacancyService;
    }
    create(req, dto) {
        return this.vacancyService.create(dto, req.user.id);
    }
    findApproved(page, limit) {
        return this.vacancyService.findApproved(Number(page) || 1, Number(limit) || 6);
    }
    findWithFilters(query) {
        return this.vacancyService.findWithFilters(query);
    }
    approve(id) {
        return this.vacancyService.approve(id);
    }
    findAll() {
        return this.vacancyService.findAll();
    }
    findOne(id) {
        return this.vacancyService.findById(id);
    }
    async getByCompany(companyId) {
        return this.vacancyService.findByCompany(companyId);
    }
    async deleteVacancy(id) {
        return this.vacancyService.delete(id);
    }
};
exports.VacancyController = VacancyController;
__decorate([
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_vacancy_dto_1.CreateVacancyDto]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('approved'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "findApproved", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "findWithFilters", null);
__decorate([
    (0, common_1.Patch)('approve/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "approve", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('company/:companyId'),
    __param(0, (0, common_1.Param)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VacancyController.prototype, "getByCompany", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VacancyController.prototype, "deleteVacancy", null);
exports.VacancyController = VacancyController = __decorate([
    (0, common_1.Controller)('vacancies'),
    __metadata("design:paramtypes", [vacancy_service_1.VacancyService])
], VacancyController);
//# sourceMappingURL=vacancy.controller.js.map