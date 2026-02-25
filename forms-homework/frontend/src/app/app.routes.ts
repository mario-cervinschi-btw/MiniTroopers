import { Routes } from '@angular/router';
import { NetworkTableComponent } from './pages/network-table/network-table.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const routes: Routes = [
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
    path: '**',
    redirectTo: '',
  },
];
