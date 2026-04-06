import { JobsService } from './jobs.service';
import { Job } from './jobs.entity';
import { PaginatedResponse } from '../common/pagination';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    findAll(search?: string, page?: number, limit?: number): Promise<PaginatedResponse<Job>>;
    findOne(id: number): Promise<Job>;
    create(body: Partial<Job>): Promise<Job>;
    update(id: number, body: Partial<Job>): Promise<Job>;
    remove(id: number): Promise<void>;
}
