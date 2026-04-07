import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { AuthFacade } from '../../shared/store/auth/auth.facade';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authFacade = inject(AuthFacade);
  const token = authService.getSessionToken();

  let clonedReq = req;

  if (token && authService.verifyTokenValidity()) {
    clonedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authFacade.logout();
      }

      return throwError(() => error);
    }),
  );
};
