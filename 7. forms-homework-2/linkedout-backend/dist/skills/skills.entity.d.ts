import { Job } from "src/jobs/jobs.entity";
import { User } from "src/users/users.entity";
export declare class Skill {
    id: number;
    name: string;
    users: User[];
    jobs: Job[];
}
