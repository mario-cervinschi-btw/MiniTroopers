import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCurrentUser, updateCurrentUser } from './auth.actions';
import {
  selectCurrentUser,
  selectErrorUpdateCurrentUser,
  selectLoadingCurrentUser,
  selectLoadingUpdateCurrentUser,
} from './auth.selectors';
import { User } from '../../models/user.model';
import { loadUserTablePreferences } from '../user-table/user-table.actions';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly store = inject(Store);

  readonly currentUser$ = this.store.select(selectCurrentUser);

  readonly loadingCurrentUser$ = this.store.select(selectLoadingCurrentUser);
  readonly loadingUpdateCurrentUser$ = this.store.select(selectLoadingUpdateCurrentUser);

  readonly errorUpdateCurrentUser$ = this.store.select(selectErrorUpdateCurrentUser);

  init(): void {
    this.store.dispatch(loadCurrentUser());
  }

  updateUser(user: User): void {
    this.store.dispatch(updateCurrentUser({ user }));
  }
}
