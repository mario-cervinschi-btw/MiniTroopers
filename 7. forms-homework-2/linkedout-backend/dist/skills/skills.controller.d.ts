import { SkillsService } from './skills.service';
import { Skill } from './skills.entity';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    findAll(): Promise<Skill[]>;
    findOne(id: number): Promise<Skill>;
}
