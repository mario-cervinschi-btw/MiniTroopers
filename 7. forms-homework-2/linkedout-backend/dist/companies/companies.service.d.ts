import { Repository } from 'typeorm';
import { Company } from './companies.entity';
export declare class CompaniesService {
    private readonly companiesRepository;
    constructor(companiesRepository: Repository<Company>);
    findAll(search?: string, page?: number, limit?: number): Promise<[Company[], number]>;
    findOne(id: number): Promise<Company>;
}
