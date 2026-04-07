import { Injectable, NotFoundException } from '@nestjs/common';
import { PracticesRepository } from './practices.repository';
import {
  PracticeCategorySummary,
  PracticeCategoryWithItems,
} from './practices.types';

@Injectable()
export class PracticesService {
  constructor(private readonly practicesRepository: PracticesRepository) {}

  getCategorySummaries(): PracticeCategorySummary[] {
    return this.practicesRepository.findCategorySummaries();
  }

  getCategoryBySlug(slug: string): PracticeCategoryWithItems {
    const category = this.practicesRepository.findCategoryBySlug(slug);

    if (!category) {
      throw new NotFoundException(`Practice category "${slug}" was not found.`);
    }

    return category;
  }
}
