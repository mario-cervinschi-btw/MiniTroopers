import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { NgrxComponent } from './features/ngrx-page/ngrx.component';
import { RxjsComponent } from './features/rxjs-page/rxjs.component';
import { SignalsComponent } from './features/signals-page/signals.component';
import { PracticesPage } from './features/practices-page/practices-page';
import { Router, RouterOutlet } from '@angular/router';

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
  imports: [
    CommonModule,
    // RxjsComponent,
    // NgrxComponent,
    // SignalsComponent,
    // PracticesPage,
    RouterOutlet,
  ],
})
export class App {
  private readonly router = inject(Router);

  sidebarOpen = true;
  activeSidebarItem: string | null = null;
  sidebarSections = [
    { id: '', label: 'Practices', icon: '📋' },
    { id: 'rxjs', label: 'RxJS', icon: '🌊' },
    { id: 'ngrx', label: 'NgRx Store', icon: '🏪' },
    { id: 'signals', label: 'Signals', icon: '⚡' },
  ];

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  selectSidebarItem(id: string): void {
    this.router.navigate([id]);
  }

  isSidebarItemActive(id: string): boolean {
    return this.activeSidebarItem === id;
  }
}
