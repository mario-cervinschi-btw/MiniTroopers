import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgrxComponent } from './ngrx/ngrx.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SignalsComponent } from './signals/signals.component';

interface PracticeCategorySummary {
  slug: string;
  title: string;
  description: string;
  orderIndex: number;
  itemCount: number;
}

interface PracticeItem {
  title: string;
  summary: string;
  details: string;
  whyItMatters: string;
  goodExample: string;
  badExample: string;
  tags: string[];
  orderIndex: number;
}

interface PracticeCategoryDetails extends PracticeCategorySummary {
  items: PracticeItem[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [CommonModule, RxjsComponent, NgrxComponent, SignalsComponent],
})
export class App {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  readonly apiBaseUrl = 'http://localhost:3000/practices';

  categories: any[] = [];
  openedCategorySlugs = new Set<string>();
  categoryDetails: Record<string, any> = {};
  loading = false;
  errorMessage = '';

  sidebarOpen = true;
  activeSidebarItem: string | null = null;
  sidebarSections = [
    { id: 'practices', label: 'Practices', icon: '📋' },
    { id: 'rxjs', label: 'RxJS', icon: '🌊' },
    { id: 'ngrx', label: 'NgRx Store', icon: '🏪' },
    { id: 'signals', label: 'Signals', icon: '⚡' },
  ];

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  selectSidebarItem(id: string): void {
    this.activeSidebarItem = id;
  }

  isSidebarItemActive(id: string): boolean {
    return this.activeSidebarItem === id;
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.loading = true;
    this.errorMessage = '';

    this.http.get<any[]>(`${this.apiBaseUrl}/categories`).subscribe((categories) => {
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

    this.http.get<any>(`${this.apiBaseUrl}/categories/${slug}`).subscribe((details) => {
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
