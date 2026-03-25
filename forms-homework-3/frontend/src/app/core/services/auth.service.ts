import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { loginSuccess } from '../../shared/store/auth/auth.actions';

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

  auth(data: AuthCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.base + '/login', data);
  }

  register(data: RegisterCredentials) {}

  setSessionToken(token: string) {
    sessionStorage.setItem('authToken', token);
  }

  getSessionToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  // returns userId if token valid. otherwise null.
  verifyTokenValidity(): number | null {
    const token = this.getSessionToken();
    if (token) {
      const decodedJwt = jwtDecode(token);
      const userId = decodedJwt.sub;

      if (decodedJwt.exp) {
        const exp = decodedJwt.exp < (new Date().getTime() + 1) / 1000;
        if (exp) {
          this.deleteToken();
          return null;
        }
      } else {
        this.deleteToken();
        return null;
      }

      if (userId) {
        return +userId;
      } else {
        this.deleteToken();
        return null;
      }
    }
    return null;
  }

  deleteToken() {
    sessionStorage.removeItem('authToken');
  }
}
