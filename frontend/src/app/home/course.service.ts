import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCourse, Course } from '../models/model';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  constructor(private http:HttpClient) { }

  api= `http://localhost:3000`

  //Course list and course details
  getCourseById(id: number){
    return this.http.get(`${this.api}/course/${id}`);
  }
  
  getCourses(){
    return this.http.get(`${this.api}/course/`);
  }

  //Reviewa
  getReviews(){
    return this.http.get(`${this.api}/review/`)
  }

  getRatings(course_id:number){
    return this.http.get(`${this.api}/review/rating/${course_id}`)
  }
  
  //Enrollment
  getEnrollments(){
    return this.http.get(`${this.api}/enrollment/`);
  }
  
  enrollCourse(userId: number, courseId: number) {
    
    return this.http.post(`${this.api}/enrollment/`, { userId, courseId });
  }


  //Course managment by teacher/admin
  addCourse(course:AddCourse){
    return this.http.post(`${this.api}/course/`, course)
  }

  updateCourse(course:Course){
    console.log('Course ID:', course.id); // Log the course ID
    console.log('Course Data:', course); // Log the entire course object
    
    return this.http.put(`${this.api}/course/${course.id}`, course)
  }

  deleteCourse(id:number){
    return this.http.delete(`${this.api}/course/${id}`)
  }
}

