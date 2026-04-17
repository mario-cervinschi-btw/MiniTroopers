import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllTopics, selectLoading } from './ngrx.selectors';
import { loadTopics } from './ngrx.actions';

@Injectable({ providedIn: 'root' })
export class NgrxFacade {
  private readonly store = inject(Store);

  readonly selectAllTopics$ = this.store.select(selectAllTopics);
  readonly selectLoading$ = this.store.select(selectLoading);

  loadTopics() {
    this.store.dispatch(loadTopics());
  }
}
