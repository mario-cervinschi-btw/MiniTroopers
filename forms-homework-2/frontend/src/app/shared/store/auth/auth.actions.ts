import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loadCurrentUser = createAction('[Auth] Load Current User');

export const loadCurrentUserSuccess = createAction(
  '[Auth] Load Current User Success',
  props<{ user: User }>(),
);

export const loadCurrentUserFailure = createAction(
  '[Auth] Load Current User Failure',
  props<{ error: string }>(),
);

export const updateCurrentUser = createAction(
  '[Auth] Update Current User',
  props<{ user: User }>(),
);
