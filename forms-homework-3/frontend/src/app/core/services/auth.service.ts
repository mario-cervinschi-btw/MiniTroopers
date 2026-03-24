import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

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

  verifyTokenValidity(): number | null {
    const token = this.getSessionToken();
    if (token) {
      console.log(jwtDecode(token));
    }
    return null;
  }
}
