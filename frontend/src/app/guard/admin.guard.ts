import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(private _auth: AuthService, private route: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (!this._auth.isLoggedIn()) {
      return this.route.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
    }
    return this._auth.getRole() === "admin"
      ? true
      : this.route.createUrlTree(['/home']);
  }
}
