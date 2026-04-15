import { Routes } from '@angular/router';
import { PracticesPage } from './features/practices-page/practices-page';
import { RxjsComponent } from './features/rxjs-page/rxjs.component';
import { NgrxComponent } from './features/ngrx-page/ngrx.component';
import { SignalsComponent } from './features/signals-page/signals.component';

export const routes: Routes = [
  { path: '', component: PracticesPage, title: 'Best Practices' },
  { path: 'rxjs', component: RxjsComponent, title: 'RxJS Essentials' },
  { path: 'ngrx', component: NgrxComponent, title: 'NgRx Store' },
  { path: 'signals', component: SignalsComponent, title: 'Angular Signals' },
];
