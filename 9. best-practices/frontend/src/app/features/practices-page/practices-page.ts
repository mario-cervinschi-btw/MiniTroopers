import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PracticesService } from '../../shared/services/practices-service';
import { PageHeader } from '../../shared/components/page-header/page-header';

@Component({
  selector: 'app-practices-page',
  imports: [CommonModule, PageHeader],
  templateUrl: './practices-page.html',
  styleUrl: './practices-page.scss',
})
export class PracticesPage implements OnInit {
  private readonly practicesService = inject(PracticesService);
  categories: any[] = [];
  loading = false;
  errorMessage = '';

  openedCategorySlugs = new Set<string>();
  categoryDetails: Record<string, any> = {};

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.loading = true;
    this.errorMessage = '';

    this.practicesService.fetchCategories().subscribe((categories) => {
      this.categories = categories.sort((a: any, b: any) => a.orderIndex - b.orderIndex);
      this.loading = false;
    });
  }

  toggleCategory(slug: string, category: any): void {
    if (this.openedCategorySlugs.has(slug)) {
      this.openedCategorySlugs.delete(slug);
      return;
    }

    this.openedCategorySlugs.add(slug);

    if (this.categoryDetails[slug]) {
      return;
    }

    this.practicesService.fetchCategoryDetails(slug).subscribe((details) => {
      this.categoryDetails[slug] = details;
    });
  }

  isOpen(slug: string): boolean {
    return this.openedCategorySlugs.has(slug);
  }

  getDetails(slug: string): any {
    return this.categoryDetails[slug] ?? null;
  }
}
