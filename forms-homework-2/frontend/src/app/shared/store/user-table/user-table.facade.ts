import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectLoadingUsers,
  selectLoadingUsersPrefereces,
  selectUsers,
  selectUsersPrefereces,
} from './user-table.selector';
import {
  loadUsers,
  loadUserTablePreferences,
  updateUserTablePreferences,
} from './user-table.actions';
import { AuthFacade } from '../auth/auth.facade';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { TablePreferences } from '../../models/table-preferences.model';

@Injectable({ providedIn: 'root' })
export class UserTableFacade {
  private readonly store = inject(Store);

  readonly users$ = this.store.select(selectUsers);
  readonly loadingUsers$ = this.store.select(selectLoadingUsers);

  readonly tablePrefences$ = this.store.select(selectUsersPrefereces);
  readonly loadingTablePreferences$ = this.store.select(selectLoadingUsersPrefereces);

  init(): void {
    this.tablePrefences$
      .pipe(
        switchMap((pref) => {
          return pref
            ? of({
                pageNumber: pref.pagination.pageNumber,
                pageSize: pref.pagination.pageSize,
                searchFilter: pref.searchFilter,
              })
            : of({ pageNumber: 1, pageSize: 10, searchFilter: '' });
        }),
      )
      .subscribe((pref) => {
        this.store.dispatch(
          loadUsers({ page: pref.pageNumber, limit: pref.pageSize, search: pref.searchFilter }),
        );
      });
  }

  updateUserPreference(pref: TablePreferences) {
    this.store.dispatch(updateUserTablePreferences({ preferences: pref }));
  }
}
