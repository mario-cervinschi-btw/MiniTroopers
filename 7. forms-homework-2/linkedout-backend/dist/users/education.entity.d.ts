import { User } from "./users.entity";
export declare class Education {
    id: number;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startYear: number;
    endYear: number | null;
    user: User;
}
