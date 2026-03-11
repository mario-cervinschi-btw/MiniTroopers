import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { loadCurrentUser, loadCurrentUserFailure, loadCurrentUserSuccess } from './auth.actions';
import { UsersService } from '../../services/users.service';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly usersService = inject(UsersService);

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrentUser),
      switchMap(() =>
        this.usersService.getAllUsers({ limit: 1 }).pipe(
          map((response) => {
            const user = response.data[0];
            return user
              ? loadCurrentUserSuccess({ user })
              : loadCurrentUserFailure({ error: 'No user found' });
          }),
          catchError((err) =>
            of(loadCurrentUserFailure({ error: err?.message ?? 'Unknown error' })),
          ),
        ),
      ),
    ),
  );
}
