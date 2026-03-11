import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import {
  loadCurrentUser,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
  updateCurrentUser,
} from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  on(loadCurrentUser, (state) => ({ ...state, loading: true, error: null })),

  on(loadCurrentUserSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    loading: false,
  })),

  on(loadCurrentUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(updateCurrentUser, (state, { user }) => ({
    ...state,
    currentUser: user,
  })),
);
