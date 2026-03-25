import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { checkAuthToken, loadCurrentUser, updateCurrentUser } from './auth.actions';
import {
  selectCurrentUser,
  selectErrorUpdateCurrentUser,
  selectIsLoggedIn,
  selectLoadingCurrentUser,
  selectLoadingUpdateCurrentUser,
} from './auth.selectors';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);

  readonly currentUser$ = this.store.select(selectCurrentUser);

  readonly isAuthInitialized$ = this.store.select(selectIsLoggedIn);

  readonly loadingCurrentUser$ = this.store.select(selectLoadingCurrentUser);
  readonly loadingUpdateCurrentUser$ = this.store.select(selectLoadingUpdateCurrentUser);

  readonly errorUpdateCurrentUser$ = this.store.select(selectErrorUpdateCurrentUser);

  init(): void {
    this.store.dispatch(checkAuthToken());
  }

  updateUser(user: User): void {
    this.store.dispatch(updateCurrentUser({ user }));
  }
}
