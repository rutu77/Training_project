import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../models/model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-lessondetails',
  standalone: false,
  templateUrl: './lessondetails.component.html',
  styleUrl: './lessondetails.component.css'
})
export class LessondetailsComponent implements OnInit{
  lesson:Lesson |undefined;
  userId= Number(localStorage.getItem("userId"))
  
  constructor(private route:ActivatedRoute, private courseService:CourseService, private router:Router){}

  ngOnInit(){
    const lessonId= this.route.snapshot.paramMap.get('id')

    if(lessonId){
      this.courseService.getLessonById(+lessonId).subscribe((res:any)=>{
        this.lesson= res.data
      })
    }
  }

  updateLesson(lessonId: number): void {
    this.router.navigate([`home/updateLesson/${lessonId}`]);
  }

}
