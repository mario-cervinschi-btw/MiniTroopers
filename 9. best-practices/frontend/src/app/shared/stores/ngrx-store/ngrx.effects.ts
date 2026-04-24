import { DestroyRef, inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadTopics, loadTopicsFailure, loadTopicsSuccess } from './ngrx.actions';
import { NgrxService } from '../../services/ngrx-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgrxTopic } from '../../models/ngrx.model';

@Injectable()
export class NgrxPageEffects {
  private actions$ = inject(Actions);
  private ngrxService = inject(NgrxService);
  private destroyRef = inject(DestroyRef);

  loadTopics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTopics),
      switchMap(() =>
        this.ngrxService.fetchTopics().pipe(
          map((topics: NgrxTopic[]) => loadTopicsSuccess({ topics })),
          takeUntilDestroyed(this.destroyRef),
          catchError((err) =>
            of(loadTopicsFailure({ error: err.message ?? 'Failed to load topics' })),
          ),
        ),
      ),
    ),
  );
}
