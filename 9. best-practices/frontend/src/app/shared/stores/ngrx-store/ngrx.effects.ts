import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadTopics, loadTopicsFailure, loadTopicsSuccess } from './ngrx.actions';
import { NgrxService } from '../../services/ngrx-service';
import { Topic } from '../../models/topic.model';

@Injectable()
export class NgrxPageEffects {
  private actions$ = inject(Actions);
  private ngrxService = inject(NgrxService);

  loadTopics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTopics),
      switchMap(() =>
        this.ngrxService.fetchTopics().pipe(
          map((topics: Topic[]) => loadTopicsSuccess({ topics })),
          catchError((err) =>
            of(loadTopicsFailure({ error: err.message ?? 'Failed to load topics' })),
          ),
        ),
      ),
    ),
  );
}
