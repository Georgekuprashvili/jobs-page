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
exports.VacancySchema = exports.VacancyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let VacancyService = class VacancyService {
    vacancyModel;
    constructor(vacancyModel) {
        this.vacancyModel = vacancyModel;
    }
    async create(dto, companyId) {
        const created = await this.vacancyModel.create({
            ...dto,
            companyId,
            companyEmail: dto.companyEmail,
            approved: false,
        });
        return { message: 'Vacancy created, pending approval', data: created };
    }
    async findApproved() {
        return this.vacancyModel.find({ approved: true }).sort({ createdAt: -1 });
    }
    async approve(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            return;
        return this.vacancyModel.findByIdAndUpdate(id, { approved: true }, { new: true });
    }
    async findWithFilters(query) {
        const filters = { approved: true };
        if (query.search) {
            filters.$or = [
                { title: { $regex: query.search, $options: 'i' } },
                { description: { $regex: query.search, $options: 'i' } },
            ];
        }
        if (query.category)
            filters.category = query.category;
        if (query.location)
            filters.location = query.location;
        if (query.salaryFrom || query.salaryTo) {
            filters.salary = {};
            if (query.salaryFrom)
                filters.salary.$gte = Number(query.salaryFrom);
            if (query.salaryTo)
                filters.salary.$lte = Number(query.salaryTo);
        }
        return this.vacancyModel.find(filters).sort({ createdAt: -1 }).limit(50);
    }
    async findAll() {
        return this.vacancyModel.find();
    }
    async findById(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            return null;
        return this.vacancyModel.findById(id);
    }
    async findByCompany(companyId) {
        return this.vacancyModel.find({ companyId }).sort({ createdAt: -1 });
    }
    async delete(id) {
        return this.vacancyModel.findByIdAndDelete(id);
    }
};
exports.VacancyService = VacancyService;
exports.VacancyService = VacancyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Vacancy')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VacancyService);
const mongoose_3 = require("mongoose");
exports.VacancySchema = new mongoose_3.Schema({
    title: String,
    description: String,
    location: String,
    salary: Number,
    category: String,
    companyId: String,
    companyName: String,
    approved: Boolean,
}, {
    timestamps: true,
});
//# sourceMappingURL=vacancy.service.js.map