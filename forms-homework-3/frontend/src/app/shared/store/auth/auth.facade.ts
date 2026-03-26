import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { checkAuthToken, loadCurrentUser, logout, updateCurrentUser } from './auth.actions';
import {
  selectCurrentUser,
  selectErrorUpdateCurrentUser,
  selectInitAuth,
  selectIsLoggedIn,
  selectLoadingCurrentUser,
  selectLoadingUpdateCurrentUser,
} from './auth.selectors';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);

  readonly currentUser$ = this.store.select(selectCurrentUser);

  readonly isAuthInitialized$ = this.store.select(selectInitAuth);
  readonly isLoggedIn$ = this.store.select(selectIsLoggedIn);

  readonly loadingCurrentUser$ = this.store.select(selectLoadingCurrentUser);
  readonly loadingUpdateCurrentUser$ = this.store.select(selectLoadingUpdateCurrentUser);

  readonly errorUpdateCurrentUser$ = this.store.select(selectErrorUpdateCurrentUser);

  init(): void {
    this.store.dispatch(checkAuthToken());
  }

  updateUser(user: User): void {
    this.store.dispatch(updateCurrentUser({ user }));
  }

  loadUser(id: number): void {
    this.store.dispatch(loadCurrentUser({ id: id }));
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}
