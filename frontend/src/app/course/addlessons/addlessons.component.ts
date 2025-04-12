import { Component, EventEmitter, Output } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addlessons',
  standalone: false,
  templateUrl: './addlessons.component.html',
  styleUrl: './addlessons.component.css'
})
export class AddlessonsComponent {

  userId= Number(localStorage.getItem('userId'));
  
  constructor(private _course:CourseService){}

  @Output() lessonAdded= new EventEmitter<void>();

  lessonForm!: FormGroup;


  ngOnInit(): void {
    this.lessonForm= new FormGroup({
      title: new FormControl(''),
      videoUrl: new FormControl(''),
      duration: new FormControl(0),
      courseId: new FormControl(''),
    })

  }

  onSubmit(){
    if(this.lessonForm.valid){
  
      console.log(this.lessonForm.value.courseId);
      
      this._course.addLesson(this.lessonForm.value,this.userId).subscribe(
        ()=>{
          Swal.fire({
            title: 'Lesson Added',
            text: 'The lesson has been added successfully!',
            icon: 'success',
          });
          this.lessonAdded.emit();
          this.lessonForm.reset();
        },
        (error:any)=>{
          console.error("Error adding lesson", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.error.message || "Something went wrong!",
          });
        }
      )
      }
    }

    onCancel(){
      this.lessonForm.reset();
    }
  }



