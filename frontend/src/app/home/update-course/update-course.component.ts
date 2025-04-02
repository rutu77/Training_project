import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Course } from '../../models/model';

@Component({
  selector: 'app-update-course',
  standalone: false,
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})
export class UpdateCourseComponent implements OnInit{
  courses: Course[] = [];
  selectedCourseId!: number;
  userId= Number(localStorage.getItem('userId'));

  courseForm!: FormGroup;

  constructor(private _course:CourseService){}


  ngOnInit(): void {
    this.courseForm= new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl(''),
      isPublished: new FormControl(false),
      thumbnail: new FormControl(''),
      price: new FormControl(0),
      tags: new FormControl(''),
      // creatorId: new FormControl(this.userId),
      level: new FormControl(''),
      duration: new FormControl(0)
    })
  }


  onSubmit(){
    if (this.courseForm.valid) {
      const updatedCourse: Course = this.courseForm.value;
      // const courseId = this.courseForm.get('id')?.value;
      // const updatedCourse = {
      //   ...this.courseForm.value,
      //   tags: typeof this.courseForm.value.tags === 'string'
      //     ? this.courseForm.value.tags.split(',').map((tag: string) => tag.trim())
      //     : this.courseForm.value.tags,
      // };
      console.log('Form Value:', this.courseForm.value);
      console.log('creatorId:', this.courseForm.value.creatorId);
      console.log('userId:', this.userId);

      this._course.updateCourse(updatedCourse).subscribe(
        ()=>{
          Swal.fire({
            title: 'Course Updated',
            text: 'The course has been updated successfully!',
            icon: 'success',
          });
          this.courseForm.reset();
        },
        (error:any)=>{
          console.error("Error updating course", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message || "Something went wrong!",
          });
        }
      )
      }
    }
  }


 
  
 

  