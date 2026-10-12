import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';

type UserRole = 'user' | 'teacher' | 'admin';

interface AccessTokenPayload {
  exp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthSessionService implements OnDestroy {
  private readonly authState = new BehaviorSubject<boolean>(false);
  readonly authState$ = this.authState.asObservable();

  private readonly roleState = new BehaviorSubject<UserRole | null>(this.readRole());
  readonly role$ = this.roleState.asObservable();
  private readonly storageListener = (event: StorageEvent): void => {
    if (event.storageArea !== localStorage) return;
    if (event.key === null || ['token', 'loggedIn', 'user_role', 'userId'].includes(event.key)) {
      this.syncFromStorage();
    }
  };

  constructor() {
    this.authState.next(this.isLoggedIn());
    window.addEventListener('storage', this.storageListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageListener);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): UserRole | null {
    return this.readRole();
  }

  getUserId(): number | null {
    const rawUserId = localStorage.getItem('userId');
    if (!rawUserId || !/^[1-9]\d*$/.test(rawUserId)) return null;
    const userId = Number(rawUserId);
    return Number.isSafeInteger(userId) ? userId : null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token || localStorage.getItem('loggedIn') !== 'true') {
      if (token || localStorage.getItem('loggedIn') || localStorage.getItem('user_role')) {
        this.clearSession();
      }
      return false;
    }

    try {
      const { exp } = jwt_decode<AccessTokenPayload>(token);
      if (typeof exp !== 'number' || exp * 1000 <= Date.now()) {
        this.clearSession();
        return false;
      }
      return true;
    } catch {
      this.clearSession();
      return false;
    }
  }

  setSession(token: string, role: UserRole, userId: number): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user_role', role);
    localStorage.setItem('userId', String(userId));
    localStorage.setItem('loggedIn', 'true');
    this.authState.next(true);
    this.roleState.next(role);
  }

  clearSession(): void {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user_role');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('admin');
    this.authState.next(false);
    this.roleState.next(null);
  }

  private syncFromStorage(): void {
    const loggedIn = this.isLoggedIn();
    this.authState.next(loggedIn);
    this.roleState.next(loggedIn ? this.readRole() : null);
  }

  private readRole(): UserRole | null {
    const role = localStorage.getItem('user_role');
    return role === 'user' || role === 'teacher' || role === 'admin' ? role : null;
  }
}
