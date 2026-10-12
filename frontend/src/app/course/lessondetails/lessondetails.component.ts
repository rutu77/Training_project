import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Lesson } from '../../models/model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lessondetails',
  standalone: false,
  templateUrl: './lessondetails.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './lessondetails.component.css'
})
export class LessondetailsComponent implements OnInit{
  lesson:Lesson |undefined;
  isLoading = true;
  loadError = '';
  
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
    private readonly changeDetector: ChangeDetectorRef
  ){}

  ngOnInit(){
    const lessonId = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isSafeInteger(lessonId) || lessonId <= 0) {
      this.loadError = 'This lesson could not be found.';
      this.isLoading = false;
      return;
    }
    this.loadLesson(lessonId);
  }

  loadLesson(lessonId: number): void {
    this.isLoading = true;
    this.loadError = '';
    this.courseService.getLessonById(lessonId).subscribe({
      next: (response) => {
        this.lesson = response.data;
        this.isLoading = false;
        this.changeDetector.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading lesson:', error);
        this.loadError = error.error?.message || 'This lesson could not be loaded. Please try again.';
        this.isLoading = false;
        this.changeDetector.markForCheck();
      }
    });
  }

  updateLesson(lessonId: number): void {
    this.router.navigate([`home/updateLesson/${lessonId}`]);
  }

}
