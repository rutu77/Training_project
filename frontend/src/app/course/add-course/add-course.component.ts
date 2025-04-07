import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { title } from 'process';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-course',
  standalone: false,
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnInit{

  userId= Number(localStorage.getItem('userId'));

  @Output() courseAdded= new EventEmitter<void>()
  selectedFile:File|null=null;
  
  constructor(private _course:CourseService){}

  courseForm!: FormGroup;


  ngOnInit(): void {
    this.courseForm= new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      isPublished: new FormControl(false),
      thumbnail: new FormControl(''),
      price: new FormControl(0),
      creatorId: new FormControl(this.userId),
      level: new FormControl(''),
      duration: new FormControl(0)
    })
  }

  onFileSelected(event:any){
    this.selectedFile= event.target.files[0]
  }

  onSubmit(){
    if(this.courseForm.valid){
      const form= new FormData();
      form.append('title', this.courseForm.value.title);
      form.append('description', this.courseForm.value.description);
      form.append('isPublished', this.courseForm.value.isPublished);
      form.append('price', this.courseForm.value.price);
      form.append('creatorId', this.courseForm.value.creatorId);
      form.append('level', this.courseForm.value.level);
      form.append('duration', this.courseForm.value.duration);

      if(this.selectedFile){
        form.append('thumbnail', this.selectedFile);
      }
      
      this._course.addCourse(form).subscribe(
        ()=>{
          Swal.fire({
            title: 'Course Added',
            text: 'The course has been added successfully!',
            icon: 'success',
          });

          this.courseAdded.emit()
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

    onCancel(){
      this.courseForm.reset();
    }
  }



