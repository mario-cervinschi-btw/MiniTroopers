import { createAction, props } from '@ngrx/store';

export const loadTheme = createAction(
  "[UI] Loading user's theme",
  props<{ isDarkTheme: boolean }>(),
);

export const updateTheme = createAction(
  "[UI] Update user's theme",
  props<{ isDarkTheme: boolean }>(),
);
