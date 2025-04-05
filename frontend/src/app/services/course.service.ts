import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCourse, Course, Lesson, UpdateCourse } from '../models/model';
import { Observable } from 'rxjs';

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
  
  
  getCourses(){
    return this.http.get(`${this.api}/course/`);
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
// In CourseService
getLessonById(id: number) {
  console.log('Getting lesson with ID:', id);
  return this.http.get(`${this.api}/lessons/${id}`);
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
  
}

