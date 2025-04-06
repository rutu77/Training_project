import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course, Enrollment, Lesson, Review } from '../../models/model';
import { HomeService } from '../../services/home.service';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courselist',
  standalone: false,
  templateUrl: './courselist.component.html',
  styleUrl: './courselist.component.css'
})


export class CourseListComponent implements OnInit {
 
  enrollments: Enrollment[] = [];
  userId = Number(localStorage.getItem('userId'))
  backendUrl: string="http://localhost:3000/";
  reviews: Review[]=[];
  ratings: { [key: number]: any } = {}; 
  courses: Course[] = [];

  displayUpdateDialog: boolean = false;
  displayAddDialog: boolean = false;

  selectedCourseId!: number;


  constructor(private homeService: HomeService, private router: Router, private courseService:CourseService) {}

  ngOnInit(): void {   
    this.loadCourses()
    this.loadReviews()
    this.loadEnrollments()

    this.courseService.query$.subscribe(query=>{
      this.filterCourses(query);
    })
  }

  loadCourses(){
    this.courseService.getCourses().subscribe((data:any)=>{
      this.courses=data;
    })
  }

  loadReviews(){
    this.homeService.getReviews().subscribe((data:any)=>{
      this.reviews= data;
      this.calculateMeanRatings();

    })
  }

  loadEnrollments(){
    
    this.homeService.getEnrollments().subscribe((data:any) => {
      this.enrollments = data;
      // console.log(this.enrollments);
    });
  }

  getReview(courseId: number){
    const review= this.reviews.find(review=>review.course.id===courseId)
    // this.rating= review?.rating
  }

  
  calculateMeanRatings(): void {
    // console.log(this.courses);
    this.courses.forEach(course => {
      const courseReviews = this.reviews.filter(review => review.course.id === course.id);
      if (courseReviews.length > 0) {
        const totalRating = courseReviews.reduce((sum, review) => sum + review.rating, 0);
        this.ratings[course.id] = totalRating / courseReviews.length;
      } else {
        this.ratings[course.id] = 0; 
      }
    });
  }
  

  viewCourse(courseId: number): void {
    this.router.navigate([`home/course/${courseId}`]);
    // console.log(courseId);
    
  }

  enroll(): void {
    this.router.navigate(['home/enrollment']);
  }

  isEnrolled(courseId: number): boolean {
    const enroll = this.enrollments.some(enrollment => enrollment.user.id === this.userId && enrollment.course.id === courseId);
    return enroll;
  }

  filterCourses(query:string){
    this.courses = this.courses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase()) 
      ||course.description.toLowerCase().includes(query.toLowerCase())
    );
  }

}