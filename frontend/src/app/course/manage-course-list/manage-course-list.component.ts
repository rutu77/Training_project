import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/model';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2';
import { error } from 'console';

@Component({
  selector: 'app-manage-course-list',
  standalone: false,
  templateUrl: './manage-course-list.component.html',
  styleUrl: './manage-course-list.component.css',
})
export class ManageCourseListComponent implements OnInit {
  courses: Course[] = [];
  displayUpdateDialog = false;
  selectCourseId!: number;
  userId = Number(localStorage.getItem('userId'));

  constructor(private course: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.course.getCourses().subscribe((data: any) => {
      this.courses = data;

      this.courses = this.courses
        .filter((course) => !course.deleted)
        .filter((course) => course.creator.id === this.userId);

      // console.log([this.courses].flat());
    });
  }

  refresh() {
    this.loadCourses();
    this.displayUpdateDialog = false;
  }

  onOpenUpdate(id: number) {
    this.selectCourseId = id;
    this.displayUpdateDialog = true;
  }

  deleteCourse(courseId: number) {
    this.course.deleteCourse(courseId).subscribe(
      () => {
        // Swal.fire({
        //   title: 'Course Deleted',
        //   text: 'The course has been deleted successfully!',
        //   icon: 'success',
        // });
        this.loadCourses();
      },
      (error: any) => {
        console.error('Error deleting Course:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while deleting the Course.',
          icon: 'error',
        });
      }
    );
  }
}
