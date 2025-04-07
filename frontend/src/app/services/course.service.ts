import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCourse, AddReview, Course, Lesson, Review, UpdateCourse } from '../models/model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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
  addCourse(course:FormData){
    return this.http.post(`${this.api}/course/`, course)
  }

  updateCourse(id:number,course:FormData){
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

  getReviewsByCourseId(courseId:number){
    return this.http.get(`${this.api}/review/course/${courseId}`)
  }

  getDiscussionByCourseId(courseId:number){
    return this.http.get(`${this.api}/comment/course/${courseId}`)
  }


  //Search
  private searchQuery=new BehaviorSubject<string>('');
  query$ = this.searchQuery.asObservable();

  emitSearch(query:string){
    this.searchQuery.next(query)
  }

  
}

