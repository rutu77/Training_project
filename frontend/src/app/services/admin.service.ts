import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, UpdateUserRole, User } from '../models/model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  private readonly api= environment.apiUrl
  getTeacherRequests(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.api}/admin/teacher-requests`)
  }

  reviewTeacherRequest(id: number, decision: 'approved' | 'rejected'): Observable<ApiResponse<User>> {
    return this.http.patch<ApiResponse<User>>(`${this.api}/admin/teacher-requests/${id}`, { decision })
  }

  updateRole(data: UpdateUserRole): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.api}/admin/updateRole`, data)
  }

  deleteUser(id:number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.api}/user/${id}`)
  }

  getUserById(id:number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.api}/user/${id}`)
  }

  updateUser(id:number, data:FormData): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.api}/user/${id}`, data)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/user/`)
  }

}
