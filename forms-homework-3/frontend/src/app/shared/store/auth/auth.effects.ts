import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import {
  authTokenFailure,
  checkAuthToken,
  loadCurrentUser,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
  loginSuccess,
  logout,
  updateCurrentUser,
  updateCurrentUserFailure,
  updateCurrentUserSuccess,
} from './auth.actions';
import { UsersService } from '../../services/users.service';
import { loadTheme } from '../ui/ui.actions';
import { AuthService } from '../../../core/services/auth.service';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly usersService = inject(UsersService);
  private readonly authService = inject(AuthService);

  checkAuthStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAuthToken),
      take(1),
      switchMap(() => {
        const id = this.authService.verifyTokenValidity();
        if (id) {
          return of(loadCurrentUser({ id: id }));
        } else {
          return of(authTokenFailure({ error: 'Invalid token' }));
        }
      }),
    ),
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.authService.deleteToken();
        }),
      ),
    { dispatch: false },
  );

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrentUser),
      switchMap((val) =>
        this.usersService.getUserById(val.id).pipe(
          switchMap((response) => {
            const user = response;
            if (user) {
              return of(
                loadCurrentUserSuccess({ user }),
                loadTheme({ isDarkTheme: user.isDarkTheme }),
                loginSuccess({ user }),
              );
            } else {
              return of(loadCurrentUserFailure({ error: 'No user found' }));
            }
          }),
          catchError((err) =>
            of(loadCurrentUserFailure({ error: err?.message ?? 'Unknown error' })),
          ),
        ),
      ),
    ),
  );

  updateCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCurrentUser),
      switchMap(({ user }) =>
        this.usersService.updateUser(user.id, user).pipe(
          map((updatedUser) => updateCurrentUserSuccess({ user: updatedUser })),
          catchError((err) =>
            of(updateCurrentUserFailure({ error: err?.message ?? 'Update failed' })),
          ),
        ),
      ),
    ),
  );
}
