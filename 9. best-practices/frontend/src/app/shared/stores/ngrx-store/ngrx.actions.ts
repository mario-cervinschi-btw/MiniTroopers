import { createAction, props } from '@ngrx/store';
import { Topic } from '../../models/topic.model';

export const loadTopics = createAction('[NgRx Page] Load Topics');

export const loadTopicsSuccess = createAction(
  '[NgRx API] Load Topics ',
  props<{ topics: Topic[] }>(),
);

export const loadTopicsFailure = createAction(
  '[NgRx API] Load Topics Failure',
  props<{ error: string }>(),
);
