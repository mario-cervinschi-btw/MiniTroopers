import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllTopics, selectError, selectLoading } from './ngrx.selectors';
import { loadTopics } from './ngrx.actions';

@Injectable({ providedIn: 'root' })
export class NgrxFacade {
  private readonly store = inject(Store);

  readonly selectAllTopics$ = this.store.select(selectAllTopics);
  readonly selectLoading$ = this.store.select(selectLoading);
  readonly selectError$ = this.store.select(selectError);

  loadTopics() {
    this.store.dispatch(loadTopics());
  }
}
