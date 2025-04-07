import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCourse, AddReview, Course, UpdateCourse, UpdateReview, User } from '../models/model';
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

  updateUser(id:number,user:FormData){
    return this.http.put(`${this.api}/user/${id}`, user)
  }

  //Reviews

  addReview(review:AddReview){
    return this.http.post(`${this.api}/review/`, review)
  }

  deleteReview(id:number){
    return this.http.delete(`${this.api}/review/${id}`)
  }

  updateReview(id:number, review:UpdateReview){
    return this.http.put(`${this.api}/review/${id}`, review)
  }

}

