import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enroll',
  standalone: false,
  templateUrl: './enroll.component.html',
  styleUrl: './enroll.component.css'
})
export class EnrollComponent{

    courseId!: number ;
    userName: string = '';
    userId= Number(localStorage.getItem('userId'));
  
    constructor(private route: ActivatedRoute,private router: Router,private courseService: CourseService){}

    
    // ngOnInit(): void {
    //   const id = this.route.snapshot.paramMap.get('id');
    //   this.courseId = id ? +id : 0; 
    // }
  
    enroll(){
      this.courseService.enrollCourse(this.userId, this.courseId).subscribe(() => {
        this.router.navigate(['/home/courses']);
        console.log("enrolled successfully")
        this.showEnrollSuccess();
      });
    }

    showEnrollSuccess() {
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

      Toast.fire({
        icon: "success",
        title: "Thanks!!",
        text: "You are successfully enrolled in the course"
      });
    }
  }
 