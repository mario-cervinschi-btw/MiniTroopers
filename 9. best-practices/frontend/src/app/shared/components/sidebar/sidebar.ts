import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
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
