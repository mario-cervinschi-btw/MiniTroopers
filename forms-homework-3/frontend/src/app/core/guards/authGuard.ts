import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthFacade } from '../../shared/store/auth/auth.facade';
import { filter, map, take, tap } from 'rxjs';

export const authGuard: CanActivateChildFn = (route, state) => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  return authFacade.isAuthInitialized$.pipe(
    take(1),
    map((isLogged) => {
      if (isLogged) {
        return true;
      } else {
        return router.parseUrl('/login');
      }
    }),
  );
};
