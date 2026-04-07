import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDarkTheme } from './ui.selector';
import { updateTheme } from './ui.actions';

@Injectable({ providedIn: 'root' })
export class UiFacade {
  private readonly store = inject(Store);

  readonly isDarkTheme$ = this.store.select(selectDarkTheme);

  updateDarkTheme(isDarkTheme: boolean) {
    this.store.dispatch(updateTheme({ isDarkTheme: isDarkTheme }));
  }
}
