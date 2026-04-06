import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../services/users.service';
import {
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  loadUserTablePreferences,
  updateUserTablePreferences,
  updateUserTablePreferencesFailure,
  updateUserTablePreferencesSuccess,
} from './user-table.actions';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import { AuthFacade } from '../auth/auth.facade';
import { updateCurrentUser } from '../auth/auth.actions';
import { User } from '../../models/user.model';

@Injectable()
export class UserTableEffects {
  private readonly actions$ = inject(Actions);
  private readonly usersService = inject(UsersService);
  private readonly authFacade = inject(AuthFacade);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap((action) =>
        this.usersService
          .getAllUsers({ page: action.page, limit: action.limit, search: action.search })
          .pipe(
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

  updateTablePreferences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserTablePreferences),
      switchMap((action) =>
        this.authFacade.currentUser$.pipe(
          take(1),
          switchMap((response) => {
            if (response) {
              const updatedUser: User = { ...response, tablePreferences: action.preferences };
              return of(
                updateUserTablePreferencesSuccess({ preferences: action.preferences }),
                updateCurrentUser({ user: updatedUser }),
              );
            } else {
              return of(updateUserTablePreferencesFailure({ error: 'Sth went wrong' }));
            }
          }),
          catchError((err) =>
            of(updateUserTablePreferencesFailure({ error: err?.message ?? 'Unknown error' })),
          ),
        ),
      ),
    ),
  );
}
