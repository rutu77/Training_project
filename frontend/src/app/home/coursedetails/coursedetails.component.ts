import { Component, OnInit } from '@angular/core';
import { Discussion, Course, Enrollment, Lesson, Review } from '../../models/model';
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
    discussions:Discussion[]=[]
    isAdmin: boolean= false;;
    isTeacher: boolean=false ;
    displayUpdateDialog=false
    isLoggedIn:boolean=false
    reviewId!:number
    showUpdateReview=false
    displayUpdateEnrollDialog=false
    showEnrollDialog=false
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
    ) {
      this._auth.$role.subscribe(role=>this.isTeacher=role==='teacher')
      this._auth.$role.subscribe(role=>this.isAdmin=role==='admin')
      this._auth.$authState.subscribe(loggedIn=>this.isLoggedIn=loggedIn)
    }
  

    ngOnInit(): void {
      const courseId = this.route.snapshot.paramMap.get('id');
      
      if (courseId) {
        this.courseId= +courseId
        this.loadCourseById(courseId);
        this.loadLessonsByCourseId(courseId);
        this.loadReviewsByCourseId(courseId);
        // this.loadDiscussipnsByCourseId(courseId)
        this.selectedCourseId= +courseId;

      }

      this.loadEnrollments();
  }

  loadCourseById(courseId: string) {
    this.courseService.getCourseById(+courseId).subscribe((res:any) => {
      this.course = res.data;
    });
  }

  loadLessonsByCourseId(courseId: string){
    this.courseService.getLessonByCourseId(+courseId).subscribe((res: any) => {
      this.lessons = res.data;
      console.log(this.lessons); 
  })
  }

  loadEnrollments(){
    this.homeService.getEnrollments().subscribe((data:any) => {
      this.enrollments = data;
    });
  }

  loadReviewsByCourseId(courseId:string){
    this.courseService.getReviewsByCourseId(+courseId).subscribe((data:any) => {
      this.reviews=data.data;
      console.log(this.reviews);
    });
    this.showUpdateReview=false
  }


  refresh(){
    this.displayUpdateDialog=false
    this.loadReviewsByCourseId(this.selectedCourseId.toString())
  }

  CancelUpdateReview(){
    this.showUpdateReview=false
    this.editingReviewId = null;
  }


  // loadDiscussipnsByCourseId(courseId:string){
  //   this.courseService.getDiscussionByCourseId(+courseId).subscribe((data:any) => {
  //     this.discussions=data.data;
  //     console.log(this.discussions);
  //   });
  // }

   
    // enroll(){
    //   this.homeService.enrollCourse(this.userId, this.courseId).subscribe(() => {
    //     this.router.navigate(['/home/courses']);
    //     console.log("enrolled successfully")
    //     this.showEnrollSuccess();
    //   });
    // }

    // showEnrollSuccess() {
    //   const Toast = Swal.mixin({
    //     toast: true,
    //     position: "bottom",
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //     didOpen: (toast) => {
    //       toast.onmouseenter = Swal.stopTimer;
    //       toast.onmouseleave = Swal.resumeTimer;
    //     }
    //   });

    //   Toast.fire({
    //     icon: "success",
    //     title: "Thanks!!",
    //     text: "You are successfully enrolled in the course"
    //   });
    // }
    

  isEnrolled(courseId: number): boolean {
    const enroll = this.enrollments.some(enrollment => enrollment.user.id === this.userId && enrollment.course.id === courseId);
    return enroll;
  }

  
  viewLesson(lessonId:number){
    this.router.navigate([`course/lesson/${lessonId}`]);
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
      (res:any) => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: 'Review deleted successfully!',
        })
        this.loadReviewsByCourseId(this.selectedCourseId.toString())
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

  
    onOpenUpdate(id:number){
      this.selectedCourseId=id;
      this.displayUpdateDialog= true
    }
}
  