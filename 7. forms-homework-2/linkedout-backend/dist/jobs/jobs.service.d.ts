import { Repository } from 'typeorm';
import { Job } from './jobs.entity';
export declare class JobsService {
    private readonly jobsRepository;
    constructor(jobsRepository: Repository<Job>);
    findAll(search?: string, page?: number, limit?: number): Promise<[Job[], number]>;
    findOne(id: number): Promise<Job>;
    create(data: Partial<Job>): Promise<Job>;
    update(id: number, data: Partial<Job>): Promise<Job>;
    remove(id: number): Promise<void>;
}
