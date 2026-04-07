import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthFacade } from '../../shared/store/auth/auth.facade';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.baseURL}/auth`;
  private readonly router = inject(Router);
  private readonly authFacade = inject(AuthFacade);

  auth(data: AuthCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.base + '/login', data).pipe(
      tap((response) => {
        const token = response.accessToken;
        sessionStorage.setItem('authToken', token);

        const id = this.verifyTokenValidity();
        if (id) {
          this.authFacade.loadUser(id);
        }
      }),
    );
  }

  register(data: RegisterCredentials): Observable<void> {
    return this.http.post<void>(this.base + '/register', data);
  }

  getSessionToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  // returns userId if token valid. otherwise null.
  verifyTokenValidity(): number | null {
    const token = this.getSessionToken();
    if (!token) return null;

    try {
      const decodedJwt: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (!decodedJwt.exp || decodedJwt.exp < currentTime) {
        this.deleteToken();
        return null;
      }

      const userId = decodedJwt.sub;
      if (!userId) {
        this.deleteToken();
        return null;
      }

      return +userId;
    } catch (error) {
      this.deleteToken();
      return null;
    }
  }

  deleteToken() {
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
