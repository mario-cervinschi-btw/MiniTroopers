import { createReducer, on } from '@ngrx/store';
import { initialTableState } from './user-table.state';
import {
  loadUserTablePreferences,
  loadUserTableFailure,
  loadUserTableSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  updateUserTablePreferences,
  updateUserTablePreferencesSuccess,
  updateUserTablePreferencesFailure,
} from './user-table.actions';

export const userTableReducer = createReducer(
  initialTableState,

  on(loadUserTablePreferences, (state) => ({
    ...state,
    loadingTablePreferences: true,
    error: null,
  })),

  on(loadUserTableSuccess, (state, { preferences }) => ({
    ...state,
    userTablePreferences: preferences,
    loadingTablePreferences: false,
  })),

  on(loadUserTableFailure, (state, { error }) => ({
    ...state,
    loadingTablePreferences: false,
    error,
  })),

  on(loadUsers, (state) => ({
    ...state,
    loadingUsers: true,
    error: null,
  })),

  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: users,
    loadingUsers: false,
  })),

  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loadingUsers: false,
    error,
  })),

  on(updateUserTablePreferences, (state) => ({
    ...state,
    loadingTablePreferences: true,
    error: null,
  })),

  on(updateUserTablePreferencesSuccess, (state, { preferences }) => ({
    ...state,
    userTablePreferences: preferences,
    loadingTablePreferences: false,
  })),

  on(updateUserTablePreferencesFailure, (state, { error }) => ({
    ...state,
    // userTablePreferences: pref,
    loadingTablePreferences: false,
    error: error,
  })),
);
