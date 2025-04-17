import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-course',
  standalone: false,
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})

export class UpdateCourseComponent implements OnInit{

  @Input() courseId!:number;
  @Output() courseUpdated= new EventEmitter()

  updateCourseForm!: FormGroup;


  constructor(private _course:CourseService){}

  ngOnInit(): void {
    this.updateCourseForm= new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      level: new FormControl(''),
      duration: new FormControl(''),
    })

  }

  ngOnChanges(){
    this.loadCourseData()
  }

  loadCourseData(){
    if(this.courseId){
      this._course.getCourseById(this.courseId).subscribe((res:any)=>{
        this.updateCourseForm.patchValue({
          title: res.data.title,
          description: res.data.description,
          price: res.data.price, 
          level: res.data.level,
          duration: res.data.duration,
        });
      })
    }
  }

  onSubmit() {
    if (this.updateCourseForm.invalid) return;
    
    this._course.updateCourse(this.courseId, this.updateCourseForm.value).subscribe(
      () => {
        Swal.fire({
          title: 'Course Updated',
          text: 'The course has been updated successfully!',
          icon: 'success',
        });
      this.courseUpdated.emit();

      },
      (error: any) => {
        console.error('Error updating course:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update the course.'
        });
        this.courseUpdated.emit();
      }
    );
  }
}


