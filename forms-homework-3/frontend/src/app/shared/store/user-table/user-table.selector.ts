import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserTableState } from './user-table.state';

export const TABLE_PREF_KEY = 'table_preferences';

export const selectUsersState = createFeatureSelector<UserTableState>(TABLE_PREF_KEY);

export const selectUsers = createSelector(selectUsersState, (s) => s.users);
export const selectLoadingUsers = createSelector(selectUsersState, (s) => s.loadingUsers);

export const selectUsersPrefereces = createSelector(
  selectUsersState,
  (s) => s.userTablePreferences,
);
export const selectLoadingUsersPrefereces = createSelector(
  selectUsersState,
  (s) => s.loadingTablePreferences,
);
