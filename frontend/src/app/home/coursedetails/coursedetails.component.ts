import { Component, OnInit } from '@angular/core';
import { Course, Enrollment, Lesson } from '../../models/model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { HomeService } from '../../services/home.service';
import { AuthService } from '../../services/auth.service';


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
    isAdmin: boolean= false;;
    isTeacher: boolean=false ;

  

    constructor(
      private route: ActivatedRoute,
      private courseService: CourseService,
      private homeService:HomeService,
      private router: Router,
      private _auth:AuthService
    ) {
      this._auth.$role.subscribe(role=>this.isTeacher=role==='teacher')
      this._auth.$role.subscribe(role=>this.isAdmin=role==='admin')
    }
  

    ngOnInit(): void {
      const courseId = this.route.snapshot.paramMap.get('id');
      
      if (courseId) {
        this.courseService.getCourseById(+courseId).subscribe((res:any) => {
          this.course = res.data;
        });
          
          this.courseService.getLessonByCourseId(+courseId).subscribe((res: any) => {
            this.lessons = res.data;
            console.log(this.lessons); 
        })
     
      }

      this.homeService.getEnrollments().subscribe((data:any) => {
        this.enrollments = data;
      });

      // this.courseService.getLessons().subscribe((res:any)=>{
      //   this.lessons= res
      // })


  }

    

  isEnrolled(courseId: number): boolean {
    const enroll = this.enrollments.some(enrollment => enrollment.user.id === this.userId && enrollment.course.id === courseId);
    // console.log(enroll);
    // console.log(this.lessons);
    return enroll;
  }

  
  viewLesson(lessonId:number){
    this.router.navigate([`course/lesson/${lessonId}`]);
  }


}
  