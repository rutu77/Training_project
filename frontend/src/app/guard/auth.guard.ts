import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this._auth.isLoggedIn();

    if (isLoggedIn) {
      return true;
    } else {
      alert("Login First!")
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
