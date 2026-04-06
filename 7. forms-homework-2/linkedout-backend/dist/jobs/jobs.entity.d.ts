import { Company } from 'src/companies/companies.entity';
import { Skill } from 'src/skills/skills.entity';
import { JobType } from './enums/job-type.enum';
export declare class Job {
    id: number;
    title: string;
    description: string;
    location: string;
    type: JobType;
    createdAt: Date;
    company: Company;
    requiredSkills: Skill[];
}
