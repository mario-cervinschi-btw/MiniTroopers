import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { PracticesService } from '../../shared/services/practices-service';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { PracticeCategoryDetails, PracticeItem } from '../../shared/models/practice.model';

@Component({
  selector: 'app-practices-page',
  imports: [CommonModule, PageHeader],
  templateUrl: './practices-page.html',
  styleUrl: './practices-page.scss',
})
export class PracticesPage implements OnInit {
  private readonly practicesService = inject(PracticesService);
  protected readonly categories = signal<PracticeCategoryDetails[]>([]);
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');

  protected readonly openedCategorySlugs = signal(new Set<string>());
  protected readonly categoryDetails = signal<Record<string, PracticeCategoryDetails>>({});

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.practicesService.fetchCategories().subscribe((categories) => {
      this.categories.set(categories.sort((a: any, b: any) => a.orderIndex - b.orderIndex));
      this.loading.set(false);
    });
  }

  toggleCategory(slug: string, category: any): void {
    if (this.openedCategorySlugs().has(slug)) {
      this.openedCategorySlugs.update((set) => {
        const next = new Set(set);
        next.delete(slug);
        return next;
      });
      return;
    }

    this.openedCategorySlugs.update((set) => {
      const next = new Set(set);
      next.add(slug);
      return next;
    });

    if (this.categoryDetails()[slug]) {
      return;
    }

    this.practicesService.fetchCategoryDetails(slug).subscribe((details) => {
      this.categoryDetails.update((val) => ({
        ...val,
        [slug]: details,
      }));
    });
  }

  isOpen(slug: string): boolean {
    return this.openedCategorySlugs().has(slug);
  }

  getDetails(slug: string): any {
    return this.categoryDetails()[slug] ?? null;
  }
}
