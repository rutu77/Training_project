import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCourse, Course, UpdateCourse, User } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(private http:HttpClient) { }

  api= `http://localhost:3000`

  //Reviewa
  getReviews(){
    return this.http.get(`${this.api}/review/`)
  }
  
  
  //Enrollment
  getEnrollments(){
    return this.http.get(`${this.api}/enrollment/`);
  }
  
  enrollCourse(userId: number, courseId: number) {
    return this.http.post(`${this.api}/enrollment/`, { userId, courseId });
  }


  //User
  getUserById(id: number){
    return this.http.get(`${this.api}/user/${id}`);
  }

  updateUser(id:number,user:User){
    return this.http.put(`${this.api}/user/${id}`, user)
  }

  uploadProfilePicture(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.api}/users/${userId}/profile-picture`, formData);
  }

}

