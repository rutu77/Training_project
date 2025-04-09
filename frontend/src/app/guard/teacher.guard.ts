import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})

export class teacherGuard implements CanActivate {
  constructor(private _auth: AuthService, private route: Router) {}

  canActivate(): boolean {
    const isTeacher = this._auth.getRole()==="teacher";
    const isAdmin = this._auth.getRole()==="admin";


    if (isTeacher || isAdmin) {
      return true;
    } else {
      Swal.fire("Only authorized people can access this page")
      this.route.navigate(['/index']);
      return false;
    }
  }
}
