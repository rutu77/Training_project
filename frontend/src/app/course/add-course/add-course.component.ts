import { Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-add-course',
  standalone: false,
  templateUrl: './add-course.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnInit{

  @Output() courseAdded= new EventEmitter<void>()
  
  selectedFile:File|null=null;
  isSubmitting = false;
  
  constructor(
    private _course:CourseService,
    private notifications: NotificationService
  ){}

  courseForm!: FormGroup;


  ngOnInit(): void {
    this.courseForm= new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      isPublished: new FormControl(false),
      thumbnail: new FormControl(''),
      price: new FormControl(0),
      level: new FormControl(''),
      duration: new FormControl(0)
    })
  }

  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  onSubmit(){
    if(this.courseForm.invalid || this.isSubmitting) return;
    if(this.courseForm.valid){
      const form= new FormData();
      form.append('title', this.courseForm.value.title);
      form.append('description', this.courseForm.value.description);
      form.append('isPublished', String(this.courseForm.value.isPublished ?? false));
      form.append('price', this.courseForm.value.price);
      form.append('level', this.courseForm.value.level);
      form.append('duration', this.courseForm.value.duration);

      if(this.selectedFile){
        form.append('thumbnail', this.selectedFile);
      }
      
      this.isSubmitting = true;
      this._course.addCourse(form).subscribe({
        next: ()=>{
          this.notifications.success('The course has been added successfully.');
          this.courseForm.reset({
            title: '',
            description: '',
            isPublished: false,
            thumbnail: '',
            price: 0,
            level: '',
            duration: 0
          });
          this.selectedFile = null;
          this.isSubmitting = false;
          this.courseAdded.emit()
        },
        error: (error:any)=>{
          console.error("Error adding course", error);
          this.notifications.error(error.error?.message || "The course could not be added.");
          this.isSubmitting = false;
        }
      })
      }
    }
  }
