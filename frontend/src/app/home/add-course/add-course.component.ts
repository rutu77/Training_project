import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { title } from 'process';
import { CourseService } from '../course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-course',
  standalone: false,
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnInit{

  userId= Number(localStorage.getItem('userId'));
  
  constructor(private _course:CourseService){}

  courseForm!: FormGroup;


  ngOnInit(): void {
    this.courseForm= new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      isPublished: new FormControl(false),
      thumbnail: new FormControl(''),
      price: new FormControl(0),
      tags: new FormControl(''),
      creatorId: new FormControl(this.userId),
      level: new FormControl(''),
      duration: new FormControl(0)
    })


  }

  // addCourseForm = new FormGroup({
  //   title: new FormControl(''),
  //   description: new FormControl(''),
  //   isPublished: new FormControl(false),
  //   thumbnail: new FormControl(''),
  //   price: new FormControl(0),
  //   tags: new FormControl(''),
  //   creatorId: new FormControl(this.userId),
  //   level: new FormControl(''),
  //   duration: new FormControl(0)
  // }); 

  onSubmit(){
    if(this.courseForm.valid){

      
      this._course.addCourse(this.courseForm.value).subscribe(
        ()=>{
          Swal.fire({
            title: 'Course Added',
            text: 'The course has been added successfully!',
            icon: 'success',
          });

          console.log(this.courseForm.value.creatorId);
          console.log(this.userId);
        },
        (error:any)=>{
          console.error("Error adding course", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.error.message || "Something went wrong!",
          });
        }
      )
      }
    }
  }



