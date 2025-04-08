import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCourse, AddReview, Course, Quiz, UpdateCourse, UpdateReview, User } from '../models/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(private http:HttpClient) { }

  api= `http://localhost:3000`

  
  //Enrollment
  getEnrollments(){
    return this.http.get(`${this.api}/enrollment/`);
  }
  
  enrollCourse(userId: number, courseId: number) {
    return this.http.post(`${this.api}/enrollment/`, { userId, courseId });
  }

  // getEnrollmentById(id:number){
  //   return this.http.get(`${this.api}/enroll/${id}`)
  // }

  // markAsCompleted(id:number){
  //   return this.http.get(`${this.api}/enroll/status/${id}`)
  // }

  //User
  getUserById(id: number){
    return this.http.get(`${this.api}/user/${id}`);
  }

  updateUser(id:number,user:FormData){
    return this.http.put(`${this.api}/user/${id}`, user)
  }

  //Reviews
  getReviews(){
    return this.http.get(`${this.api}/review/`)
  }
  

  addReview(review:AddReview){
    return this.http.post(`${this.api}/review/`, review)
  }

  deleteReview(id:number){
    return this.http.delete(`${this.api}/review/${id}`)
  }

  updateReview(id:number, review:UpdateReview){
    return this.http.put(`${this.api}/review/${id}`, review)
  }


  //Quizzes
  getAllQuizzes(){
    return this.http.get(`${this.api}/quiz/`);
  }

  createQuiz(quizData:any){
    return this.http.post(`${this.api}/quiz/`,quizData)
  }

  updateQuiz(courseId:number,data:Quiz){
    return this.http.put(`${this.api}/quiz/${courseId}`,data)
  }

  deleteQuiz(id: number){
    return this.http.delete(`${this.api}/quiz/${id}`);
  }

  getQuizByCourse(courseId:number){
    return this.http.get(`${this.api}/quiz/course/${courseId}`)
  }

  addQuestiontoQuiz(quizId:number,questions:any){
    return this.http.post(`${this.api}/quiz/addQ/${quizId}`,questions)
  }

  updateQuestion(id:number,question:any){
    return this.http.put(`${this.api}/question/${id}`,question)
  }

  deleteQuestion(id: number){
    return this.http.delete(`${this.api}/question/${id}`);
  }

  getQuestionsByQuiz(quizId:number){
    return this.http.get(`${this.api}/question/quiz/${quizId}`)
  }

  getQuizById(id:number){
    return this.http.get(`${this.api}/quiz/${id}`)
  }

  submitQuiz(id: number, data: { userId: number; answers: any }) {
    return this.http.post(`${this.api}/quiz/submit/${id}`, data);
  }
  

  //progress
  getProgressById(id:number){
    return this.http.get(`${this.api}/progress/${id}`)
  }

  getProgressByUser(userId:number){
    return this.http.get(`${this.api}/progress/user/${userId}`)
  }

  downloadQuizReport(id:number){
    return this.http.get(`${this.api}/progress/report/${id}`,{ responseType: 'blob' })
  }

}

