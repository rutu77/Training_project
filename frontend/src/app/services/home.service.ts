import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AddReview,
  ApiResponse,
  Course,
  CreateQuiz,
  CreateQuizQuestion,
  Enrollment,
  ManagedEnrollment,
  ProgressRecord,
  Quiz,
  QuizProgressResponse,
  QuizQuestion,
  QuizSubmission,
  Review,
  UpdateReview,
  User,
} from '../models/model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  constructor(private http:HttpClient) { }

  private readonly api= environment.apiUrl

  
  //Enrollment
  getEnrollments(): Observable<Enrollment[]>{
    return this.http.get<Enrollment[]>(`${this.api}/enrollment/me`);
  }
  
  getAllEnrollments(): Observable<Enrollment[]>{
    return this.http.get<Enrollment[]>(`${this.api}/enrollment/`);
  }

  getManageEnrollments(): Observable<ManagedEnrollment[]>{
    return this.http.get<ManagedEnrollment[]>(`${this.api}/enrollment/manage`);
  }

  enrollCourse(courseId: number): Observable<ApiResponse<Enrollment>> {
    return this.http.post<ApiResponse<Enrollment>>(`${this.api}/enrollment/`, { courseId });
  }

  downloadEnrollmentReciept(courseId:number): Observable<Blob>{
    return this.http.get(`${this.api}/enrollment/receipt/${courseId}`, {responseType: 'blob' })
  }
  

  //User
  getUserById(id: number): Observable<ApiResponse<User>>{
    return this.http.get<ApiResponse<User>>(`${this.api}/user/${id}`);
  }

  updateUser(id:number,user:FormData): Observable<ApiResponse<User>>{
    return this.http.put<ApiResponse<User>>(`${this.api}/user/${id}`, user)
  }

  //Reviews
  getReviews(): Observable<Review[]>{
    return this.http.get<Review[]>(`${this.api}/review/`)
  }
  

  addReview(review:AddReview): Observable<ApiResponse<Review>>{
    return this.http.post<ApiResponse<Review>>(`${this.api}/review/`, review)
  }

  deleteReview(id:number): Observable<{message:string}>{
    return this.http.delete<{message:string}>(`${this.api}/review/${id}`)
  }

  updateReview(id:number, review:UpdateReview): Observable<ApiResponse<Review>>{
    return this.http.put<ApiResponse<Review>>(`${this.api}/review/${id}`, review)
  }
  

  //Quizzes
  getAllQuizzes(): Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${this.api}/quiz/`);
  }

  createQuiz(quizData:CreateQuiz): Observable<ApiResponse<Quiz>>{
    return this.http.post<ApiResponse<Quiz>>(`${this.api}/quiz/`,quizData)
  }

  updateQuiz(quizId:number,data:Pick<Quiz, 'title'>): Observable<ApiResponse<Quiz>>{
    return this.http.put<ApiResponse<Quiz>>(`${this.api}/quiz/${quizId}`,data)
  }

  deleteQuiz(id: number): Observable<void>{
    return this.http.delete<void>(`${this.api}/quiz/${id}`);
  }

  getQuizByCourse(courseId:number): Observable<Quiz[]>{
    return this.http.get<Quiz[]>(`${this.api}/quiz/course/${courseId}`)
  }

  addQuestiontoQuiz(quizId:number,question:CreateQuizQuestion): Observable<QuizQuestion>{
    return this.http.post<QuizQuestion>(`${this.api}/quiz/addQ/${quizId}`,question)
  }

  updateQuestion(id:number,question:Partial<CreateQuizQuestion>): Observable<ApiResponse<QuizQuestion>>{
    return this.http.put<ApiResponse<QuizQuestion>>(`${this.api}/question/${id}`,question)
  }

  deleteQuestion(id: number): Observable<void>{
    return this.http.delete<void>(`${this.api}/question/${id}`);
  }

  getQuestionsByQuiz(quizId:number): Observable<QuizQuestion[]>{
    return this.http.get<QuizQuestion[]>(`${this.api}/question/quiz/${quizId}`)
  }

  getQuizById(id:number): Observable<ApiResponse<Quiz>>{
    return this.http.get<ApiResponse<Quiz>>(`${this.api}/quiz/${id}`)
  }

  submitQuiz(id: number, data: { answers: Record<string, string> }): Observable<QuizSubmission> {
    return this.http.post<QuizSubmission>(`${this.api}/quiz/submit/${id}`, data);
  }
  


  //progress
  getProgressById(id:number): Observable<ApiResponse<ProgressRecord>>{
    return this.http.get<ApiResponse<ProgressRecord>>(`${this.api}/progress/${id}`)
  }

  getAllProgress(): Observable<ProgressRecord[]>{
    return this.http.get<ProgressRecord[]>(`${this.api}/progress/`)
  }

  getManageProgress(): Observable<ProgressRecord[]>{
    return this.http.get<ProgressRecord[]>(`${this.api}/progress/manage`)
  }

  getProgressByUser(userId:number): Observable<ApiResponse<QuizProgressResponse[]>>{
    return this.http.get<ApiResponse<QuizProgressResponse[]>>(`${this.api}/progress/user/${userId}`)
  }

  downloadQuizReport(id:number): Observable<Blob>{
    return this.http.get(`${this.api}/progress/report/${id}`,{ responseType: 'blob' })
  }

}
