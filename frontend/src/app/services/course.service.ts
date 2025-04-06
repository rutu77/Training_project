import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCourse, Course, Lesson, UpdateCourse } from '../models/model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  constructor(private http:HttpClient) { }

  api= `http://localhost:3000`

  //Courses
  getCourseById(id: number){
    return this.http.get(`${this.api}/course/${id}`);
  }
  
  
  getCourses(query:string=''){
    const url= query? `${this.api}/search?search=${encodeURIComponent(query)}`: `${this.api}/course/`
    return this.http.get(url);
  }

  //Course managment by teacher/admin
  addCourse(course:AddCourse){
    return this.http.post(`${this.api}/course/`, course)
  }

  updateCourse(id:number,course:UpdateCourse){
    // console.log('Course ID:', course.id); 
    // console.log('Course Data:', course); 
    return this.http.put(`${this.api}/course/${id}`, course)
  }


  deleteCourse(id:number){
    return this.http.delete(`${this.api}/course/${id}`)
  }


  //Lessons

  getLessonById(id: number) {
    return this.http.get(`${this.api}/lesson/${id}`);
  }

  getLessons(){
    return this.http.get(`${this.api}/lesson/`)
  }

  addLesson(lesson:Lesson){
    return this.http.post(`${this.api}/lesson/`,lesson)
  }

  updateLesson(id:number,lesson:Lesson){
    return this.http.put(`${this.api}/lesson/${id}`, lesson)
  }

  deleteLesson(id:number){
    return this.http.delete(`${this.api}/lesson/${id}`)
  }

  getLessonByCourseId(courseId:number){
    return this.http.get(`${this.api}/lesson/course/${courseId}`)
  }


  //Search
  private searchQuery=new Subject<string>();
  query$ = this.searchQuery.asObservable();

  emitSearch(query:string){
    this.searchQuery.next(query)
  }
  
}

