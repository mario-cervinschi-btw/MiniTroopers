import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Best Practices',
    loadComponent: () =>
      import('./features/practices-page/practices-page').then((p) => p.PracticesPage),
  },
  {
    path: 'rxjs',
    title: 'RxJS Essentials',
    loadComponent: () => import('./features/rxjs-page/rxjs.component').then((p) => p.RxjsComponent),
  },
  {
    path: 'ngrx',
    title: 'NgRx Store',
    loadComponent: () => import('./features/ngrx-page/ngrx.component').then((p) => p.NgrxComponent),
  },
  {
    path: 'signals',
    title: 'Angular Signals',
    loadComponent: () =>
      import('./features/signals-page/signals.component').then((p) => p.SignalsComponent),
  },
];
