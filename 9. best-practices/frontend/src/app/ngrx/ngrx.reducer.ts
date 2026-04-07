import { createReducer, on } from '@ngrx/store';
import { loadTopics, loadTopicsFailure, loadTopicsSuccess } from './ngrx.actions';
import { NgrxQuiz, NgrxTopic } from './ngrx.types';

export interface NgrxPageState {
  topics: NgrxTopic[];
  loading: boolean;
  error: string | null;
}

export const initialState: NgrxPageState = {
  topics: [],
  loading: false,
  error: null,
};

export const ngrxPageReducer = createReducer(
  initialState,
  on(loadTopics, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadTopicsSuccess, (state, { topics }) => ({
    ...state,
    loading: false,
    topics,
  })),

  on(loadTopicsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
