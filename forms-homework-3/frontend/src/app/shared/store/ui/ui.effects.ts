import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTheme, updateTheme } from './ui.actions';
import { catchError, map, of, switchMap, take } from 'rxjs';
import { AuthFacade } from '../auth/auth.facade';
import { User } from '../../models/user.model';
import { updateCurrentUser } from '../auth/auth.actions';

@Injectable()
export class UiEffects {
  private readonly actions$ = inject(Actions);
  private readonly authFacade = inject(AuthFacade);

  updateUiTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTheme),
      switchMap((action) =>
        this.authFacade.currentUser$.pipe(
          take(1),
          switchMap((user) => {
            if (!user) {
              return of();
            }

            const updatedUser: User = { ...user, isDarkTheme: action.isDarkTheme };
            return of(updateCurrentUser({ user: updatedUser }));
          }),
        ),
      ),
    ),
  );
}
