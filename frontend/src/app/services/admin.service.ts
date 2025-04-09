import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { request } from 'express';
import { BehaviorSubject } from 'rxjs';

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

  deleteUser(id:number){
    return this.http.put(`${this.api}/user/${id}`,{deleted:true})
  }

  getUserById(id:number){
    return this.http.get(`${this.api}/user/${id}`)
  }

  updateUser(id:number, data:any){
    return this.http.put(`${this.api}/user/${id}`,data)
  }

  getUsers(){
    return this.http.get(`${this.api}/user/`)
  }

}
