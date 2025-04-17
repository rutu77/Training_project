import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatelesson',
  standalone: false,
  templateUrl: './updatelesson.component.html',
  styleUrl: './updatelesson.component.css'
})

export class UpdatelessonComponent implements OnInit{

  @Input() lessonId!: number ;
  @Output() lessonUpdated= new EventEmitter<void>();
  @Output() cancel= new EventEmitter<void>();

  
  updateLessonForm!: FormGroup;

  constructor(private _course:CourseService){}

  ngOnInit(): void {

    this.updateLessonForm= new FormGroup({
      title: new FormControl(''),
      videoUrl: new FormControl(''),
      duration: new FormControl(''),
    })

  }

  ngOnChanges(){
    this.loadlessonData()
  }

  loadlessonData(){
    if(this.lessonId){
      this._course.getLessonById(this.lessonId).subscribe((res:any)=>{      
        this.updateLessonForm.patchValue({
          title: res.data.title,
          videoUrl: res.data.videoUrl,
          duration: res.data.duration,
        });
      })
    }
  }


  onSubmit(){
    if (this.updateLessonForm.invalid) return;
  
    // const updatedLesson= this.getUpdatedValues(this.updateLessonForm.value);

    
    this._course.updateLesson(this.lessonId, this.updateLessonForm.value).subscribe(
      () => {
        Swal.fire({
          title: 'Lesson Updated',
          text: 'The lesson has been updated successfully!',
          icon: 'success',
        });
        this.lessonUpdated.emit();
      },
      (error: any) => {
        console.error('Error updating lesson:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update the lesson.'
        });
        this.lessonUpdated.emit();
      }
    );
  }

    // private getUpdatedValues(formValues:any):any{
    //   const updatedValues:any={};
    //   for(const key in formValues){
    //     if(formValues[key]!==''){
    //       updatedValues[key]= formValues[key]
    //     }
    //   }
    //   return updatedValues;
    // }

}


