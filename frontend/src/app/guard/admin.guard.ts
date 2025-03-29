import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(private _auth: AuthService, private route: Router) {}

  canActivate(): boolean {
    const isAdmin = this._auth.getRole()==="admin";

    if (isAdmin) {
      return true;
    } else {
      Swal.fire("Only admin can acces this page")
      this.route.navigate(['/index']);
      return false;
    }
  }
}
