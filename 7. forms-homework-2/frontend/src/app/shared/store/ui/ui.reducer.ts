import { createReducer, on } from '@ngrx/store';
import { initialUiState } from './ui.state';
import { loadTheme, updateTheme } from './ui.actions';

export const uiReducer = createReducer(
  initialUiState,

  on(loadTheme, (state, { isDarkTheme }) => ({
    ...state,
    isDarkTheme: isDarkTheme,
  })),

  on(updateTheme, (state, { isDarkTheme }) => ({
    ...state,
    isDarkTheme: isDarkTheme,
  })),
);
