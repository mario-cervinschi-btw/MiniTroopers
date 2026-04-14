import { Routes } from '@angular/router';
import { PracticesPage } from './features/practices-page/practices-page';
import { RxjsComponent } from './features/rxjs-page/rxjs.component';
import { NgrxComponent } from './features/ngrx-page/ngrx.component';
import { SignalsComponent } from './features/signals-page/signals.component';

export const routes: Routes = [
  { path: '', component: PracticesPage },
  { path: 'rxjs', component: RxjsComponent },
  { path: 'ngrx', component: NgrxComponent },
  { path: 'signals', component: SignalsComponent },
];
