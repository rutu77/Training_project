import { Component } from '@angular/core';
import { Course, Enrollment, Lesson } from '../../models/model';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-lessonlist',
  standalone: false,
  templateUrl: './lessonlist.component.html',
  styleUrl: './lessonlist.component.css'
})
export class LessonlistComponent {

  course: Course | undefined;
  userId= Number(localStorage.getItem('userId'))
  lessons: Lesson[]=[]
  enrollments:Enrollment[]=[]
  
  constructor(
    private route: ActivatedRoute,
    private courseService:CourseService,
    private homeService:HomeService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    
    if (courseId) {
      this.courseService.getCourseById(+courseId).subscribe((res:any) => {
        this.course = res.data;   
      });
    }

    this.homeService.getEnrollments().subscribe((data:any) => {
      this.enrollments = data;
    });

    this.courseService.getLessons().subscribe((res:any)=>{
      this.lessons= res.data
    })
  }

  updateCourse(courseId: number): void {
    this.router.navigate([`home/updateCourse/${courseId}`]);
  }

  getLessonByCourseId(courseId:number){
    const lessonData= this.lessons.filter(lesson=>lesson.courseId===courseId)
    return lessonData
  }

  isEnrolled(courseId: number): boolean {
    const enroll = this.enrollments.some(enrollment => enrollment.user.id === this.userId && enrollment.course.id === courseId);
    return enroll;
  }

  enroll(){}
}
  