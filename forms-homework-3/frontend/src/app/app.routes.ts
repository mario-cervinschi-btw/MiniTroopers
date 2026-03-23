import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        title: 'Network',
        loadComponent: () =>
          import('./pages/network-table/network-table.component').then(
            (m) => m.NetworkTableComponent,
          ),
      },
      {
        path: 'profile/:id',
        title: 'Profile',
        loadComponent: () =>
          import('./pages/user-profile/user-profile.component').then((p) => p.UserProfileComponent),
      },
      {
        path: 'settings',
        title: 'Settings',
        loadComponent: () =>
          import('./pages/settings/settings.component').then((s) => s.SettingsComponent),
      },
      {
        path: 'companies',
        title: 'Companies',
        loadComponent: () =>
          import('./pages/companies-table/companies-table.component').then(
            (c) => c.CompaniesTableComponent,
          ),
      },
      {
        path: 'jobs',
        title: 'Jobs',
        loadComponent: () =>
          import('./pages/jobs-table/jobs-table.component').then((j) => j.JobsTableComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
