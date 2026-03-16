import { Routes } from '@angular/router';
import { NetworkTableComponent } from './pages/network-table/network-table.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CompaniesTableComponent } from './pages/companies-table/companies-table.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: NetworkTableComponent,
        title: 'Network',
      },
      {
        path: 'profile/:id',
        component: UserProfileComponent,
        title: 'Profile',
      },
      {
        path: 'settings',
        component: SettingsComponent,
        title: 'Settings',
      },
      {
        path: 'companies',
        component: CompaniesTableComponent,
        title: 'Companies',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
