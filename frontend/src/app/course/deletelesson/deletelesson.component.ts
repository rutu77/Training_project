import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deletelesson',
  standalone: false,
  templateUrl: './deletelesson.component.html',
  styleUrl: './deletelesson.component.css'
})
export class DeletelessonComponent {
  lessonId: number | null = null; 

  constructor(private _course: CourseService) {}

  onDelete() {
    if (this.lessonId) {
      this._course.deleteLesson(this.lessonId).subscribe(
        () => {
          Swal.fire({
            title: 'Lesson Deleted',
            text: 'The lesson has been deleted successfully!',
            icon: 'success',
          });
          this.lessonId = null; 
        },
        (error: any) => {
          console.error('Error deleting lesson', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error?.message || 'Something went wrong!',
          });
        }
      );
    }
  }
}