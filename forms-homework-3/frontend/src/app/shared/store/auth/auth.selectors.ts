import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_FEATURE_KEY = 'auth';

export const selectAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectIsLoggedIn = createSelector(selectAuthState, (s) => s.isAuthenticated);

export const selectCurrentUser = createSelector(selectAuthState, (s) => s.currentUser);
export const selectLoadingCurrentUser = createSelector(
  selectAuthState,
  (s) => s.loadingCurrentUser,
);
export const selectLoadingUpdateCurrentUser = createSelector(
  selectAuthState,
  (s) => s.loadingUpdateCurrentUser,
);

export const selectErrorUpdateCurrentUser = createSelector(selectAuthState, (s) => s.error);
