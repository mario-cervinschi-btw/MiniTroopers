import { Routes } from '@angular/router';
import { NetworkTableComponent } from './pages/network-table/network-table.component';

export const routes: Routes = [
    {
        path: '',
        component: NetworkTableComponent,
        title: 'Network'
    },
    {
        path: '**',
        redirectTo: ''
    }
];
