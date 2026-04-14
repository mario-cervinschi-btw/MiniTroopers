import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NgrxPageState } from './ngrx.reducer';

export const selectNgrxPageState = createFeatureSelector<NgrxPageState>('ngrxPage');

export const selectAllTopics = createSelector(selectNgrxPageState, (state) => state.topics);

export const selectLoading = createSelector(selectNgrxPageState, (state) => state.loading);

export const selectError = createSelector(selectNgrxPageState, (state) => state.error);
