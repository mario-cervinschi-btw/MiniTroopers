import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './core/guards/authGuard';
import { notLoggedGuard } from './core/guards/notLoggedGuard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [authGuard],
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
          import('./pages/companies-table/companies-table-signals.component').then(
            (c) => c.CompaniesTableSignalsComponent,
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
    path: '',
    canActivateChild: [notLoggedGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
