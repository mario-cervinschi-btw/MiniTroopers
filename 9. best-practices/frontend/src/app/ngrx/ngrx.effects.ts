import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadTopics, loadTopicsFailure, loadTopicsSuccess } from './ngrx.actions';
import { NgrxTopic } from './ngrx.types';

@Injectable()
export class NgrxPageEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadTopics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTopics),
      switchMap(() =>
        this.http.get<NgrxTopic[]>('http://localhost:3000/ngrx/topics').pipe(
          map((topics) => loadTopicsSuccess({ topics })),
          catchError((err) =>
            of(loadTopicsFailure({ error: err.message ?? 'Failed to load topics' })),
          ),
        ),
      ),
    ),
  );
}
