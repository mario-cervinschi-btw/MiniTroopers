import { OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { Skill } from '../skills/skills.entity';
import { Company } from '../companies/companies.entity';
import { Job } from '../jobs/jobs.entity';
import { Education } from '../users/education.entity';
import { Experience } from '../users/experience.entity';
export declare class DatabaseService implements OnApplicationBootstrap {
    private readonly usersRepo;
    private readonly skillsRepo;
    private readonly companiesRepo;
    private readonly jobsRepo;
    private readonly educationRepo;
    private readonly experienceRepo;
    private readonly logger;
    constructor(usersRepo: Repository<User>, skillsRepo: Repository<Skill>, companiesRepo: Repository<Company>, jobsRepo: Repository<Job>, educationRepo: Repository<Education>, experienceRepo: Repository<Experience>);
    onApplicationBootstrap(): Promise<void>;
    private seedSkills;
    private seedCompanies;
    private seedJobs;
    private seedUsers;
    private pickUnique;
}
