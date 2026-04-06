import { CompaniesService } from './companies.service';
import { Company } from './companies.entity';
import { PaginatedResponse } from '../common/pagination';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    findAll(search?: string, page?: number, limit?: number): Promise<PaginatedResponse<Company>>;
    findOne(id: number): Promise<Company>;
}
