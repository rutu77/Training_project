import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/model';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private authState = new BehaviorSubject<boolean>(this.isLoggedIn());
  $authState = this.authState.asObservable();

  private roleSubject = new BehaviorSubject<string | null>(this.getRole());
  $role = this.roleSubject.asObservable();


  api= `http://localhost:3000`
  // Login(data:any){
  //   return this.http.post(`${this.api}/auth/login`,data)
  // }

  Login(data: any) {
    return this.http.post(`${this.api}/auth/login`, data).subscribe(
      (res: any) => {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user_role', res.data.user.role);
          localStorage.setItem('loggedIn', 'true');
          this.authState.next(true);
          this.roleSubject.next(res.data.user.role);
        } 
        // else {
        //   console.error("Token is undefined in the response");
        // }
      },
      (error: any) => {
        console.error("Error during login:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.error.message || "Login Failed!",
      }
    );
  })
  }
  
  Register(data:any){
    return this.http.post(`${this.api}/auth/register`,data)
  }

  isLoggedIn(){
    return localStorage.getItem('loggedIn') === 'true';
  }

  getRole(): 'user' | 'admin' | 'teacher' | null {
    return localStorage.getItem('user_role') as 'user' | 'admin' | 'teacher' | null;
  }

  // isAdmin() {
  //   return localStorage.getItem('admin') === 'true';
  // }

  logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user_role');
    localStorage.removeItem('token');
    this.authState.next(false);
    this.roleSubject.next(null);
  }
}