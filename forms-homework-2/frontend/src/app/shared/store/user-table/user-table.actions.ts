import { createAction, props } from '@ngrx/store';
import { TablePreferences } from '../../models/table-preferences.model';
import { User } from '../../models/user.model';
import { PaginatedResponse } from '../../models/pagination.model';

export const loadUserTablePreferences = createAction('[User Table] Load User Table Preferences');

export const loadUserTableSuccess = createAction(
  '[User Table] Load User Table Preferences Success',
  props<{ preferences: TablePreferences | null }>(),
);

export const loadUserTableFailure = createAction(
  '[User Table] Load User Table Preferences Failure',
  props<{ error: string }>(),
);

export const loadUsers = createAction(
  '[User Table] Loading Users',
  props<{ page: number; limit: number }>(),
);

export const loadUsersSuccess = createAction(
  '[User Table] Loading Users Success',
  props<{ users: PaginatedResponse<User> | null }>(),
);

export const loadUsersFailure = createAction(
  '[User Table] Loading Users Failure',
  props<{ error: string }>(),
);
