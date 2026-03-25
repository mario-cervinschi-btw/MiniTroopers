import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthFacade } from '../../shared/store/auth/auth.facade';
import { map, take } from 'rxjs';

export const notLoggedGuard: CanActivateChildFn = (route, state) => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  return authFacade.isAuthInitialized$.pipe(
    take(1),
    map((isLogged) => {
      if (isLogged) {
        return router.parseUrl('/');
      } else {
        return true;
      }
    }),
  );
};
