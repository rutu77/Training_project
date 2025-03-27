import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  api= `http://localhost:3000`
  Login(data:any){
    return this.http.post(`${this.api}/auth/login`,data)
  }

  Register(data:any){
    return this.http.post(`${this.api}/auth/register`,data)
  }

  logout() {
    localStorage.setItem('loggedIn', 'false');
  }

}

