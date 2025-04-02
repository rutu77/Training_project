import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course, Enrollment, Review } from '../../models/model';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-courselist',
  standalone: false,
  templateUrl: './courselist.component.html',
  styleUrl: './courselist.component.css'
})


export class CourseListComponent implements OnInit {

  courses: Course[] = [];
  enrollments: Enrollment[] = [];
  userId = Number(localStorage.getItem('userId'))
  backendUrl: string="http://localhost:3000/";
  reviews: Review[]=[];
  ratings: { [key: number]: any } = {}; 



  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data: any) => {
      this.courses = data;
      // this.courses.forEach(course => {
      //   console.log('Course ID:', course.id);
      // });
    });
    

      // Fetch ratings for each course
      // this.courses.forEach(course => {
      //   this.courseService.getRatings(course.id).subscribe((ratingData: any) => {
      //     this.ratings[course.id] = ratingData;
      //     console.log(`Ratings for course ${course.id}:`, ratingData);
      //   });
      // });
    

    this.courseService.getReviews().subscribe((data:any)=>{
      this.reviews= data;
      this.calculateMeanRatings();

    })

    this.courseService.getEnrollments().subscribe((data:any) => {
      this.enrollments = data;
      // console.log(this.enrollments);
    });
  }


  // getReview(courseId: number){
  //   const review= this.reviews.find(review=>review.course.id===courseId)
  //   this.rating= review?.rating
  // }

  
  calculateMeanRatings(): void {
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
}

