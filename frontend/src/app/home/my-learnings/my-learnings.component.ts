import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Course, Enrollment } from '../../models/model';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-learnings',
  standalone: false,
  templateUrl: './my-learnings.component.html',
  styleUrl: './my-learnings.component.css'
})
export class MyLearningsComponent implements OnInit {

  courses:Course[]=[]
  enrollments:Enrollment[]=[]
  userId= Number(localStorage.getItem('userId'))

  constructor(private homeservice:HomeService, private courseService:CourseService, private router:Router){}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data:any)=>{
      this.courses=data;
    })

    this.homeservice.getEnrollments().subscribe((data:any)=>{
      this.enrollments=data;
    })
  }

  isEnrolled(courseId:number):boolean{
    const enroll = this.enrollments.some(enrollment => enrollment.user.id === this.userId && enrollment.course.id === courseId);
    return enroll
  }

  viewCourse(courseId: number): void {
    this.router.navigate([`home/course/${courseId}`]);
    // console.log(courseId);
    
  }
}
