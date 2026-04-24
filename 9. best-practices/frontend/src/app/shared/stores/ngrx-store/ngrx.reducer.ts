import { createReducer, on } from '@ngrx/store';
import { loadTopics, loadTopicsFailure, loadTopicsSuccess } from './ngrx.actions';
import { Topic } from '../../models/topic.model';

export interface NgrxPageState {
  topics: Topic[];
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
