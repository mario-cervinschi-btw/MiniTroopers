import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectLoadingUsers,
  selectLoadingUsersPrefereces,
  selectUsers,
  selectUsersPrefereces,
} from './user-table.selector';
import { loadUsers, loadUserTablePreferences } from './user-table.actions';
import { AuthFacade } from '../auth/auth.facade';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserTableFacade {
  private readonly store = inject(Store);

  private readonly authFacade = inject(AuthFacade);

  readonly users$ = this.store.select(selectUsers);
  readonly loadingUsers$ = this.store.select(selectLoadingUsers);

  readonly tablePrefences$ = this.store.select(selectUsersPrefereces);
  readonly loadingTablePreferences$ = this.store.select(selectLoadingUsersPrefereces);

  init(): void {
    this.tablePrefences$
      .pipe(
        switchMap((pref) => {
          return pref ? of(pref.pagination) : of({ pageNumber: 1, pageSize: 10 });
        }),
      )
      .subscribe((pref) => {
        this.store.dispatch(loadUsers({ page: pref.pageNumber, limit: pref.pageSize }));
      });
  }

  updateUserPreference() {}
}
