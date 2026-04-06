import { Job } from 'src/jobs/jobs.entity';
import { Experience } from 'src/users/experience.entity';
export declare class Company {
    id: number;
    name: string;
    description: string;
    logoUrl: string;
    website: string;
    location: string;
    jobs: Job[];
    experience: Experience[];
    jobsCount?: number;
}
