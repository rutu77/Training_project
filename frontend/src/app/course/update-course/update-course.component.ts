import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Course } from '../../models/model';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-update-course',
  standalone: false,
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})
export class UpdateCourseComponent implements OnInit{

  @Input() courseId!:number;
  @Output() courseUpdated= new EventEmitter()
  @Output() cancel= new EventEmitter()

  updateCourseForm!: FormGroup;


  constructor(private _course:CourseService){}

  ngOnInit(): void {
    // this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    this.updateCourseForm= new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      isPublished: new FormControl(false),
      // thumbnail: new FormControl(''),
      level: new FormControl(''),
      duration: new FormControl(''),
      // tags: new FormControl('')
    })

    this.loadCourseData()
  }


  loadCourseData(){
    this._course.getCourseById(this.courseId).subscribe((data:any)=>{
      this.updateCourseForm.patchValue({
        title: data.title,
        description: data.description,
        price: data.price,
        isPublished: data.isPublished,
        // thumbnail: data.thumbnail,
        level: data.level,
        duration: data.duration,
      });
    })
  }

  onSubmit() {

      if (this.updateCourseForm.invalid) return;
    
      const updatedCourse = this.getUpdatedValues(this.updateCourseForm.value)
    
      this._course.updateCourse(this.courseId, updatedCourse).subscribe(
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
        }
      );
    }

    onCancel(){
      this.cancel.emit()
    }

    private getUpdatedValues(formValues:any):any{
      const updatedValues:any={};
      for(const key in formValues){
        if(formValues[key]!==''){
          updatedValues[key]= formValues[key]
        }
      }
      return updatedValues;
    }
}


