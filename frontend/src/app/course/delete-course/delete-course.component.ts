import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-course',
  standalone: false,
  templateUrl: './delete-course.component.html',
  styleUrl: './delete-course.component.css'
})
export class DeleteCourseComponent {
  courseId: number | null = null; 

  constructor(private _course: CourseService) {}

  onDelete() {
    if (this.courseId) {
      this._course.deleteCourse(this.courseId).subscribe(
        () => {
          Swal.fire({
            title: 'Course Deleted',
            text: 'The course has been deleted successfully!',
            icon: 'success',
          });
          this.courseId = null; 
        },
        (error: any) => {
          console.error('Error deleting course', error);
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
