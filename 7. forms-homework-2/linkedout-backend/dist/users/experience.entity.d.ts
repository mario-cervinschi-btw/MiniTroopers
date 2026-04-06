import { User } from "./users.entity";
import { Company } from "src/companies/companies.entity";
export declare class Experience {
    id: number;
    title: string;
    location: string;
    startDate: string;
    endDate: string | null;
    description: string;
    user: User;
    company: Company | null;
}
