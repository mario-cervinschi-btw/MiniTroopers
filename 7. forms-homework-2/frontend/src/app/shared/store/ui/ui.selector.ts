import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from './ui.state';

export const UI_KEY = 'ui_preferences';

export const selectUiState = createFeatureSelector<UiState>(UI_KEY);

export const selectDarkTheme = createSelector(selectUiState, (s) => s.isDarkTheme);
