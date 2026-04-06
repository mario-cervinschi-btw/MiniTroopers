import type { TablePreferences } from './types/profile.types';
import { Skill } from 'src/skills/skills.entity';
import { Education } from './education.entity';
import { Experience } from './experience.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    profileImage: string;
    headline: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    location: string;
    about: string;
    password: string;
    isDarkTheme: boolean;
    skills: Skill[];
    education: Education[];
    experience: Experience[];
    connections: number;
    website: string;
    tablePreferences: TablePreferences | null;
}
