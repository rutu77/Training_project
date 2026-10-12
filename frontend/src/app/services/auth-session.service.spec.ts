import { AuthSessionService } from './auth-session.service';

function createToken(expiration: number): string {
  const payload = btoa(JSON.stringify({ exp: expiration }))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  return `header.${payload}.signature`;
}

describe('AuthSessionService', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('restores an unexpired session and role from storage', () => {
    localStorage.setItem('token', createToken(Math.floor(Date.now() / 1000) + 3600));
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('user_role', 'teacher');
    localStorage.setItem('userId', '42');

    const service = new AuthSessionService();

    expect(service.isLoggedIn()).toBeTrue();
    expect(service.getRole()).toBe('teacher');
    expect(service.getUserId()).toBe(42);
  });

  it('clears expired sessions and their stored identity', () => {
    localStorage.setItem('token', createToken(Math.floor(Date.now() / 1000) - 1));
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('user_role', 'admin');
    localStorage.setItem('userId', '42');

    const service = new AuthSessionService();

    expect(service.isLoggedIn()).toBeFalse();
    expect(service.getRole()).toBeNull();
    expect(service.getUserId()).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('synchronizes logout from another tab', () => {
    localStorage.setItem('token', createToken(Math.floor(Date.now() / 1000) + 3600));
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('user_role', 'admin');
    localStorage.setItem('userId', '42');
    const service = new AuthSessionService();
    const authStates: boolean[] = [];
    const roles: Array<string | null> = [];
    service.authState$.subscribe((state) => authStates.push(state));
    service.role$.subscribe((role) => roles.push(role));

    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user_role');
    localStorage.removeItem('userId');
    window.dispatchEvent(new StorageEvent('storage', { key: 'token', storageArea: localStorage }));

    expect(authStates[authStates.length - 1]).toBeFalse();
    expect(roles[roles.length - 1]).toBeNull();
    service.ngOnDestroy();
  });
});
