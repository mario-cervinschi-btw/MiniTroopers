import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PracticesService } from '../../shared/services/practices-service';
import { PageHeader } from '../../shared/components/page-header/page-header';
import {
  PracticeCategoryDetails,
  PracticeCategorySummary,
} from '../../shared/models/practice.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-practices-page',
  imports: [PageHeader],
  templateUrl: './practices-page.html',
  styleUrl: './practices-page.scss',
})
export class PracticesPage implements OnInit {
  private readonly practicesService = inject(PracticesService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly categories = signal<PracticeCategorySummary[]>([]);
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');

  protected readonly openedCategorySlugs = signal(new Set<string>());
  protected readonly categoryDetails = signal<Record<string, PracticeCategoryDetails>>({});

  ngOnInit(): void {
    this.initData();
  }

  private initData(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.practicesService
      .fetchCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((categories: PracticeCategorySummary[]) => {
        this.categories.set(
          categories.sort(
            (a: PracticeCategorySummary, b: PracticeCategorySummary) => a.orderIndex - b.orderIndex,
          ),
        );
        this.loading.set(false);
      });
  }

  protected toggleCategory(slug: string): void {
    if (this.openedCategorySlugs().has(slug)) {
      this.openedCategorySlugs.update((set: Set<string>) => {
        const next = new Set(set);
        next.delete(slug);
        return next;
      });
      return;
    }

    this.openedCategorySlugs.update((set: Set<string>) => {
      const next = new Set(set);
      next.add(slug);
      return next;
    });

    if (this.categoryDetails()[slug]) {
      return;
    }

    this.practicesService
      .fetchCategoryDetails(slug)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((details: PracticeCategoryDetails) => {
        this.categoryDetails.update((val) => ({
          ...val,
          [slug]: details,
        }));
      });
  }

  protected isOpen(slug: string): boolean {
    return this.openedCategorySlugs().has(slug);
  }

  protected getDetails(slug: string): PracticeCategoryDetails {
    return this.categoryDetails()[slug] ?? null;
  }
}
