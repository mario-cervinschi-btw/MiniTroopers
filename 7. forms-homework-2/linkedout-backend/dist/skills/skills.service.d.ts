import { Repository } from 'typeorm';
import { Skill } from './skills.entity';
export declare class SkillsService {
    private readonly skillsRepository;
    constructor(skillsRepository: Repository<Skill>);
    findAll(): Promise<Skill[]>;
    findOne(id: number): Promise<Skill>;
}
