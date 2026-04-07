import { Controller, Get, Param } from '@nestjs/common';
import { PracticesService } from './practices.service';
import type {
  PracticeCategorySummary,
  PracticeCategoryWithItems,
} from './practices.types';

@Controller('practices')
export class PracticesController {
  constructor(private readonly practicesService: PracticesService) {}

  @Get('categories')
  getCategories(): PracticeCategorySummary[] {
    return this.practicesService.getCategorySummaries();
  }

  @Get('categories/:slug')
  getCategoryBySlug(@Param('slug') slug: string): PracticeCategoryWithItems {
    return this.practicesService.getCategoryBySlug(slug);
  }
}
