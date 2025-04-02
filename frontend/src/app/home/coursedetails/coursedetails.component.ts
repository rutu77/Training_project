import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/model';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-coursedetails',
  standalone: false,
  templateUrl: './coursedetails.component.html',
  styleUrl: './coursedetails.component.css'
})
export class CoursedetailsComponent implements OnInit{

    course: Course | undefined;
  
    constructor(
      private route: ActivatedRoute,
      private courseService: CourseService
    ) {}
  
    ngOnInit(): void {
      const courseId = this.route.snapshot.paramMap.get('id');
      
      if (courseId) {
        this.courseService.getCourseById(+courseId).subscribe((res:any) => {
          // console.log(res.data);
          
          this.course = res.data;
          console.log(this.course?.description);       
        });
      }
    }

    enroll(arg0: any) {
      throw new Error('Method not implemented.');
      }
  }
  