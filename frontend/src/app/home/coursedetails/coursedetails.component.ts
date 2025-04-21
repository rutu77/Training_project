import { Component, OnInit } from '@angular/core';
import {
  Course,
  Enrollment,
  Lesson,
  Review,
  Quiz,
  User,
  Progress,
} from '../../models/model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { HomeService } from '../../services/home.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coursedetails',
  standalone: false,
  templateUrl: './coursedetails.component.html',
  styleUrl: './coursedetails.component.css',
})
export class CoursedetailsComponent implements OnInit {
  course: Course | undefined;
  userId = Number(localStorage.getItem('userId'));
  enrollments: Enrollment[] = [];
  lessons: Lesson[] = [];
  reviews: Review[] = [];
  quizzes: any[] = [];
  isAdmin: boolean = false;
  isTeacher: boolean = false;
  isLoggedIn: boolean = false;
  reviewId!: number;
  showUpdateReview = false;
  displayUpdateReviewDialog = false;
  displayAddReviewDialog = false;
  showEnrollDialog = false;
  courseId!: number;
  // allLessonsCompleted=false
  progress!:Progress

  selectedCourseId!: number;
  selectedReview!: Review;
  selectedCourse!: Course;

  constructor(
    private route: ActivatedRoute,
    public courseService: CourseService,
    private homeService: HomeService,
    private router: Router,
    private _auth: AuthService
  ) {
    this._auth.$role.subscribe((role) => (this.isTeacher = role === 'teacher'));
    this._auth.$role.subscribe((role) => (this.isAdmin = role === 'admin'));
    this._auth.$authState.subscribe((loggedIn) => (this.isLoggedIn = loggedIn));
  }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');

    if (courseId) {
      this.courseId = +courseId;
      this.loadCourseById(+courseId);
      this.loadLessonsByCourseId(+courseId);
      this.loadQuizzes(+courseId);
      this.loadReviewsByCourseId(+courseId);

      this.selectedCourseId = +courseId;
    }

    // this.courseService.reviews$.subscribe((data) => {
    //   this.reviews = data;
    //   // console.log(data);
    // });

    this.loadEnrollments();
    // this.loadLessonCompletion()
  }

  loadCourseById(courseId: number) {
    this.courseService.getCourseById(courseId).subscribe((res: any) => {
      this.course = res.data;
    });
  }

  //lessons
  loadLessonsByCourseId(courseId: number) {
    this.courseService.getLessonByCourseId(+courseId).subscribe((res: any) => {
      this.lessons = res.data;
      this.lessons = this.lessons.filter((lesson) => !lesson.deleted);
    });
  }

  viewLesson(lessonId: number) {
    this.router.navigate([`course/lesson/${lessonId}`]);
  }


  

  // parentClick(lesson:Lesson){
  //   this.courseService.updateLesson(lesson.id,{ completed: lesson.completed }).subscribe((data:any)=>{})
  //   // this.lessons.forEach((lesson, index) => {
  //   //   console.log(`Lesson ${index + 1} completed:`, lesson.completed);
  //   // });
  //   this.loadLessonCompletion()
  // }

  // loadLessonCompletion(){
  //   this.allLessonsCompleted = this.lessons.every(lesson => lesson.completed);
  // }

  // parentClick(lesson:any){
  //   this.homeService.updateProgress(lesson.id, {completed:this.progress.lesson.completed}).subscribe((data:any)=>{
  //     this.loadLessonCompletion();
  //   })
  // }
  
  // loadLessonCompletion(){
  //   this.homeService.getProgressByUser(this.userId).subscribe((progress:any)=>{
  //     this.lessons.forEach(lesson=>{
  //       const lessonProgress = progress.find((p:any) => p.lesson.id === lesson.id);
  //       lesson.completed=lessonProgress?lessonProgress.completed:false
  //     })
  //     this.allLessonsCompleted = this.lessons.every(lesson => lesson.completed);
  //   })
  // }
  


  //Quiz
  TakeQuiz(quizId: number) {
    this.router.navigate([`quiz/takeQuiz/${quizId}`]);
  }

  loadQuizzes(courseId: number) {
    this.homeService.getQuizByCourse(courseId).subscribe((data: any) => {
      this.quizzes = data;
      this.quizzes = this.quizzes.filter((quiz) => !quiz.deleted);
    });
  }

  //Enrollments
  loadEnrollments() {
    this.homeService.getEnrollments().subscribe((data: any) => {
      this.enrollments = data;
      this.enrollments = this.enrollments.filter((enroll) => !enroll.deleted);
    });
  }

  isEnrolled(courseId: number): boolean {
    const enroll = this.enrollments.some(
      (enrollment) =>
        enrollment.user.id === this.userId && enrollment.course.id === courseId
    );
    return enroll;
  }

  openEnrollmentDialog(course: Course) {
    this.selectedCourse = course;
    this.showEnrollDialog = true;
  }

  closeEnrollmentDialog() {
    this.showEnrollDialog = false;
  }

  refreshEnrollments() {
    this.showEnrollDialog = false;
    this.loadEnrollments();
  }

  enroll() {
    this.router.navigate(['home/enrollment']);
  }

  //reviews
  loadReviewsByCourseId(courseId: number) {
    // this.courseService.getReviewsByCourseId(this.courseId)
    this.courseService.getReviewsByCourseId(courseId).subscribe((data: any) => {
      this.reviews = data.data.filter((review: any) => !review.deleted);
      // console.log(this.reviews);
      //this.loadCourseById(courseId)
    });
  }

  //user logged in can delete and edit his own reviews
  isReviewUserSame(reviewId: number): boolean {
    return this.userId === reviewId;
  }

  updateReviewDialog(review: Review) {
    this.selectedReview = review;
    this.displayUpdateReviewDialog = true;
  }

  refreshReviews() {
    this.loadReviewsByCourseId(this.courseId);
    this.displayUpdateReviewDialog = false;
    this.displayAddReviewDialog = false;
  }

  addReviewDialog() {
    this.displayAddReviewDialog = true;
  }

  deleteReview(reviewId: number) {
    this.homeService.deleteReview(reviewId).subscribe(
      () => {
        this.loadReviewsByCourseId(this.courseId);
        this.loadCourseById(this.courseId);
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: 'Review deleted successfully!',
        });
      },
      (error: any) => {
        console.error('Error deleting review:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete review!',
        });
      }
    );
  }
}
