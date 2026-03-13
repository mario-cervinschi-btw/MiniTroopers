import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../services/users.service';
import {
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  loadUserTablePreferences,
} from './user-table.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class UserTableEffects {
  private readonly actions$ = inject(Actions);
  private readonly usersService = inject(UsersService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap((action) =>
        this.usersService.getAllUsers({ page: action.page, limit: action.limit }).pipe(
          map((response) => {
            return response
              ? loadUsersSuccess({ users: response })
              : loadUsersFailure({ error: 'No users found' });
          }),
          catchError((err) => of(loadUsersFailure({ error: err?.message ?? 'Unknown error' }))),
        ),
      ),
    ),
  );
}
