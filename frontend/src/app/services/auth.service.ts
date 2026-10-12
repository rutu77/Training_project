import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthSessionService } from './auth-session.service';
import { environment } from '../../environments/environment';

interface LoginResponse {
  data: {
    token: string;
    user: {
      id: number;
      role: 'user' | 'teacher' | 'admin';
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly session: AuthSessionService
  ) {
    this.$authState = this.session.authState$;
    this.$role = this.session.role$;
  }

  readonly $authState: Observable<boolean>;
  readonly $role: Observable<string | null>;

  private readonly api = environment.apiUrl;

  Login(data: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/auth/login`, data);
  }

  Register(data: unknown) {
    return this.http.post(`${this.api}/auth/register`, data);
  }

  setSession(token: string, role: 'user' | 'teacher' | 'admin', userId: number): void {
    this.session.setSession(token, role, userId);
  }

  isLoggedIn(): boolean {
    return this.session.isLoggedIn();
  }

  getRole(): 'user' | 'admin' | 'teacher' | null {
    return this.session.getRole();
  }

  logout(): void {
    this.session.clearSession();
  }
}
