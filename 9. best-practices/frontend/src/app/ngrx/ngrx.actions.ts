import { createAction, props } from '@ngrx/store';
import { NgrxTopic } from './ngrx.types';

export const loadTopics = createAction('[NgRx Page] Load Topics');

export const loadTopicsSuccess = createAction(
  '[NgRx API] Load Topics ',
  props<{ topics: NgrxTopic[] }>(),
);

export const loadTopicsFailure = createAction(
  '[NgRx API] Load Topics Failure',
  props<{ error: string }>(),
);
