import { Component, inject, signal } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { SidebarData } from '../../models/sidebar.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly router = inject(Router);

  protected readonly sidebarOpen = signal(true);
  protected readonly activeSidebarItem = signal<string | null>(null);

  protected readonly sidebarSections: SidebarData[] = [
    { id: '', label: 'Practices', icon: '📋' },
    { id: 'rxjs', label: 'RxJS', icon: '🌊' },
    { id: 'ngrx', label: 'NgRx Store', icon: '🏪' },
    { id: 'signals', label: 'Signals', icon: '⚡' },
  ];

  protected toggleSidebar(): void {
    this.sidebarOpen.update((val) => !val);
  }

  protected selectSidebarItem(id: string): void {
    this.router.navigate([id]);
  }

  protected isSidebarItemActive(id: string): boolean {
    const matchOptions: IsActiveMatchOptions = {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    };

    return this.router.isActive(id, matchOptions);
  }
}
