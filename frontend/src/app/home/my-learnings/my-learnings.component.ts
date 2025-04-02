import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course, Enrollment } from '../../models/model';

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

  constructor(private courseservice:CourseService){}

  ngOnInit(): void {
    this.courseservice.getCourses().subscribe((data:any)=>{
      this.courses=data;
    })

    this.courseservice.getEnrollments().subscribe((data:any)=>{
      this.enrollments=data;
    })
  }

  isEnrolled(courseId:number):boolean{
    const enroll = this.enrollments.some(enrollment => enrollment.user.id === this.userId && enrollment.course.id === courseId);
    return enroll
  }
}
