import { Job } from '../../jobs/jobs.entity';
import { Experience } from '../../users/experience.entity';
export declare class CompanyDto {
    id: number;
    name: string;
    description: string;
    logoUrl: string;
    location: string;
    website: string;
    jobs: Job[];
    experience: Experience[];
    jobsCount?: number;
}
