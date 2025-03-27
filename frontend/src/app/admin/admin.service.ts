import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { request } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  api= `http://localhost:3000`
  updateRole(data:any){
    return this.http.post(`${this.api}/admin/updateRole`,data)
  }

  registerAdmin(data:any){
    return this.http.post(`${this.api}/admin/AdminRegister`,data)
  }
}
