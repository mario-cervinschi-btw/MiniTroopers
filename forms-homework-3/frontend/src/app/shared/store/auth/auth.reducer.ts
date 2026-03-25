import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import {
  authTokenFailure,
  checkAuthToken,
  loadCurrentUser,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
  loginSuccess,
  updateCurrentUser,
  updateCurrentUserFailure,
  updateCurrentUserSuccess,
} from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  on(checkAuthToken, (state) => ({ ...state, error: null, isAuthenticating: true })),

  on(authTokenFailure, (state, { error }) => ({ ...state, isAuthenticated: false, error: error })),

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

  on(loginSuccess, (state, { user }) => ({
    ...state,
    loadingCurrentUser: false,
    isAuthenticated: true,
    currentUser: user,
  })),
);
