import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCurrentUser } from './auth.actions';
import { selectAuthLoading, selectCurrentUser } from './auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);

  readonly currentUser$ = this.store.select(selectCurrentUser);
  readonly loading$ = this.store.select(selectAuthLoading);

  init(): void {
    this.store.dispatch(loadCurrentUser());
  }
}
