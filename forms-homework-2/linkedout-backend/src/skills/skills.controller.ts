import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SkillsService } from './skills.service';
import { Skill } from './skills.entity';

@Controller('skills')
@ApiTags('Skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all skills' })
  @ApiOkResponse({ type: Skill, isArray: true })
  findAll(): Promise<Skill[]> {
    return this.skillsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a skill by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: Skill })
  @ApiNotFoundResponse({ description: 'Skill not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Skill> {
    return this.skillsService.findOne(id);
  }
}
