import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const checkAuthToken = createAction('[Auth] Checking authentication token.');
export const authTokenFailure = createAction(
  '[Auth] No valid token found.',
  props<{ error: string }>(),
);

export const loadCurrentUser = createAction('[Auth] Load Current User', props<{ id: number }>());
export const loadCurrentUserSuccess = createAction(
  '[Auth] Load Current User Success',
  props<{ user: User }>(),
);
export const loadCurrentUserFailure = createAction(
  '[Auth] Load Current User Failure',
  props<{ error: string }>(),
);

export const loginSuccess = createAction('[Auth] Login success', props<{ user: User }>());

export const updateCurrentUser = createAction(
  '[Auth] Update Current User',
  props<{ user: User }>(),
);
export const updateCurrentUserSuccess = createAction(
  '[Auth] Update Current User Success',
  props<{ user: User }>(),
);
export const updateCurrentUserFailure = createAction(
  '[Auth] Update Current User Failure',
  props<{ error: string }>(),
);

export const logout = createAction('[Auth] Logout');
// new actions ^^^^^
// old actions vvvvv
