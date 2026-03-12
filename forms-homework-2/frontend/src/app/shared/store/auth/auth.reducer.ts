import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import {
  loadCurrentUser,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
  updateCurrentUser,
  updateCurrentUserFailure,
  updateCurrentUserSuccess,
} from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  on(loadCurrentUser, (state) => ({ ...state, loadingCurrentUser: true, error: null })),

  on(loadCurrentUserSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    loadingCurrentUser: false,
  })),

  on(loadCurrentUserFailure, (state, { error }) => ({
    ...state,
    loadingCurrentUser: false,
    error,
  })),

  on(updateCurrentUser, (state) => ({ ...state, loadingUpdateCurrentUser: true, error: null })),

  on(updateCurrentUserSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    loadingUpdateCurrentUser: false,
    error: null,
  })),

  on(updateCurrentUserFailure, (state, { error }) => ({
    ...state,
    loadingUpdateCurrentUser: false,
    error,
  })),
);
