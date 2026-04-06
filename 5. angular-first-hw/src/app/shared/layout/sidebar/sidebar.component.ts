import { Component, Input } from '@angular/core';
import { NavItem } from '../../models/nav-data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: false,
})
export class SidebarComponent {
  protected navItems: NavItem[] = [
    {
      icon: '📊',
      label: 'Table',
      route: '/',
    },
    {
      icon: '📈',
      label: 'Statistics',
      route: '/statistics',
    },
  ];
}
