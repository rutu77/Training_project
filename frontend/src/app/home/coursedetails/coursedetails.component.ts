import { Component, OnInit } from '@angular/core';
import {Course, Enrollment, Lesson, Review, Quiz, User } from '../../models/model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { HomeService } from '../../services/home.service';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { title } from 'process';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-coursedetails',
  standalone: false,
  templateUrl: './coursedetails.component.html',
  styleUrl: './coursedetails.component.css'
})
export class CoursedetailsComponent implements OnInit{

    course: Course | undefined;
    userId= Number(localStorage.getItem("userId"))
    enrollments:Enrollment[]=[]
    lessons:Lesson[]=[]
    reviews:Review[]=[]
    quizzes:any[]=[]
    isAdmin: boolean= false;;
    isTeacher: boolean=false ;
    displayUpdateDialog=false
    isLoggedIn:boolean=false
    reviewId!:number
    showUpdateReview=false
    displayUpdateEnrollDialog=false
    showEnrollDialog=false
    // showQuiz=false
    courseId!:number

    editingReviewId:number |null= null
    selectedCourseId!:number
    selectedReview!: Review;
    selectedCourse!:Course
  

    constructor(
      private route: ActivatedRoute,
      private courseService: CourseService,
      private homeService:HomeService,
      private router: Router,
      private _auth:AuthService
    ){
      this._auth.$role.subscribe(role=>this.isTeacher=role==='teacher')
      this._auth.$role.subscribe(role=>this.isAdmin=role==='admin')
      this._auth.$authState.subscribe(loggedIn=>this.isLoggedIn=loggedIn)
    }
  

    ngOnInit(): void {
      const courseId = this.route.snapshot.paramMap.get('id');
      
      if (courseId) {
        this.courseId= +courseId
        this.loadCourseById(+courseId);
        this.loadLessonsByCourseId(+courseId);
        this.loadReviewsByCourseId(+courseId);
        this.loadQuizzes(+courseId);
       
        this.selectedCourseId= +courseId;
      }

      this.loadEnrollments();
  }

  loadCourseById(courseId: number) {
    this.courseService.getCourseById(+courseId).subscribe((res:any) => {
      this.course = res.data;
    });
  }


  //lessons
  loadLessonsByCourseId(courseId: number){
    this.courseService.getLessonByCourseId(+courseId).subscribe((res: any) => {
      this.lessons = res.data;
      this.lessons= this.lessons.filter(lesson=>!lesson.deleted)
  })
  }

  viewLesson(lessonId:number){
    this.router.navigate([`course/lesson/${lessonId}`]);
  }


  //Quiz
  TakeQuiz(quizId:number){
    this.router.navigate([`quiz/takeQuiz/${quizId}`])
  }

  loadQuizzes(courseId:number){
    this.homeService.getQuizByCourse(courseId).subscribe((data:any)=>{
      this.quizzes= data;
      this.quizzes= this.quizzes.filter(quiz=>!quiz.deleted)     
    })
  }



  //Enrollments
  loadEnrollments(){
    this.homeService.getEnrollments().subscribe((data:any) => {
      this.enrollments = data;
      this.enrollments= this.enrollments.filter(enroll=>!enroll.deleted)
    });
  }

  isEnrolled(courseId: number): boolean {
    const enroll = this.enrollments.some(enrollment => enrollment.user.id === this.userId && enrollment.course.id === courseId);
    return enroll;
  }

  openEnrollmentDialog(course:Course){
    this.selectedCourse=course
    this.showEnrollDialog=true
  }

  closeEnrollmentDialog(){
    this.showEnrollDialog=false
  }

  refreshEnrollments(){
    this.loadEnrollments()
    this.displayUpdateEnrollDialog=false
  }

  enroll(){
    this.router.navigate(['home/enrollment'])
  }

  


  //reviews
  loadReviewsByCourseId(courseId:number){
    this.courseService.getReviewsByCourseId(+courseId).subscribe((data:any) => {
      this.reviews=data.data;
      this.reviews= this.reviews.filter(review=>!review.deleted)
    });
    this.showUpdateReview=false
  }

  refresh(){
    this.displayUpdateDialog=false
    this.loadReviewsByCourseId(this.selectedCourseId)
  }

  CancelUpdateReview(){
    this.showUpdateReview=false
    this.editingReviewId = null;
  }

  //user logged in can delete and edit his own reviews
  isReviewUserSame(reviewId:number):boolean{
    return this.userId === reviewId;
  }

  
  editReview(review: Review) {
    this.selectedReview = review;
    this.editingReviewId = review.id;
  }


  deleteReview(reviewId:number){
    this.homeService.deleteReview(reviewId).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: 'Review deleted successfully!',
        })
        this.loadReviewsByCourseId(this.selectedCourseId)
      },
      (error:any) => {
        console.error('Error deleting review:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete review!',
        })
      }
    )}
}
  