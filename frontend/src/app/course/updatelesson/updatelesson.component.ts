import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatelesson',
  standalone: false,
  templateUrl: './updatelesson.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './updatelesson.component.css'
})

export class UpdatelessonComponent implements OnInit{

  @Input() lessonId!: number ;
  @Output() lessonUpdated= new EventEmitter<void>();
  @Output() cancel= new EventEmitter<void>();

  
  updateLessonForm!: FormGroup;
  isSaving = false;
  isLoadingLesson = false;

  constructor(private _course:CourseService){}

  ngOnInit(): void {

    this.updateLessonForm= new FormGroup({
      title: new FormControl('', [Validators.required]),
      videoUrl: new FormControl(''),
      duration: new FormControl(0, [Validators.required, Validators.min(0)]),
    })

  }

  ngOnChanges(){
    this.loadlessonData()
  }

  loadlessonData(){
    if(this.lessonId){
      this.isLoadingLesson = true;
      this._course.getLessonById(this.lessonId).subscribe({
        next: (response) => {
          this.updateLessonForm.patchValue({
            title: response.data.title,
            videoUrl: response.data.videoUrl,
            duration: response.data.duration ?? 0,
          });
          this.isLoadingLesson = false;
        },
        error: (error: any) => {
          console.error('Error loading lesson:', error);
          this.isLoadingLesson = false;
          Swal.fire({
            icon: 'error',
            title: 'Unable to load lesson',
            text: error.error?.message || 'Please try again.',
          });
        }
        });
    }
  }

  onSubmit(){
    if (this.updateLessonForm.invalid || this.isSaving || this.isLoadingLesson) {
      this.updateLessonForm.markAllAsTouched();
      return;
    }
    const values = this.updateLessonForm.getRawValue();
    const title = String(values.title ?? '').trim();
    if (!title) {
      this.updateLessonForm.controls['title'].setErrors({ required: true });
      return;
    }

    this.isSaving = true;
    this._course.updateLesson(this.lessonId, {
      title,
      videoUrl: String(values.videoUrl ?? '').trim(),
      duration: Number(values.duration),
    }).subscribe({
      next: () => {
        Swal.fire({
          title: 'Lesson Updated',
          text: 'The lesson has been updated successfully!',
          icon: 'success',
        });
        this.lessonUpdated.emit();
        this.isSaving = false;
      },
      error: (error: any) => {
        console.error('Error updating lesson:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error?.message || 'Failed to update the lesson.'
        });
        this.isSaving = false;
      }
    });
  }

}
