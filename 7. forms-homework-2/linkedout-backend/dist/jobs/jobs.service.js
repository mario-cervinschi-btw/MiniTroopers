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
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jobs_entity_1 = require("./jobs.entity");
let JobsService = class JobsService {
    jobsRepository;
    constructor(jobsRepository) {
        this.jobsRepository = jobsRepository;
    }
    async findAll(search, page = 1, limit = 10) {
        const query = this.jobsRepository
            .createQueryBuilder('job')
            .leftJoinAndSelect('job.company', 'company');
        if (search) {
            query.where('LOWER(job.title) LIKE :search', {
                search: `%${search.toLowerCase()}%`,
            });
        }
        query.skip((page - 1) * limit).take(limit);
        return query.getManyAndCount();
    }
    async findOne(id) {
        const job = await this.jobsRepository.findOne({
            where: { id },
            relations: ['company', 'requiredSkills'],
        });
        if (!job)
            throw new common_1.NotFoundException(`Job #${id} not found`);
        return job;
    }
    create(data) {
        const job = this.jobsRepository.create(data);
        return this.jobsRepository.save(job);
    }
    async update(id, data) {
        await this.findOne(id);
        await this.jobsRepository.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        await this.findOne(id);
        await this.jobsRepository.delete(id);
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(jobs_entity_1.Job)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JobsService);
//# sourceMappingURL=jobs.service.js.map