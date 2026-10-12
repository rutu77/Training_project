import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Course } from '../../models/model';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-course-list',
  standalone: false,
  templateUrl: './manage-course-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './manage-course-list.component.css',
})

export class ManageCourseListComponent implements OnInit {
  courses: Course[] = [];
  displayUpdateDialog = false;
  displayAddDialog=false;
  isLoading:boolean=true
  loadError = '';
  selectCourseId!: number;

  constructor(
    private course: CourseService,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.loadError = '';
    this.course.getManageCourses().subscribe({
      next: (data) => {
        this.courses = data.filter((course) => !course.deleted);
        this.isLoading = false;
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.courses = [];
        this.loadError = 'Courses could not be loaded. Please try again.';
        this.isLoading = false;
        this.changeDetector.detectChanges();
      }
    });
  }

  refresh() {
    this.loadCourses();
    this.displayUpdateDialog = false;
    this.displayAddDialog= false
  }

  onOpenUpdate(id: number) {
    this.selectCourseId = id;
    this.displayUpdateDialog = true;
  }

  onOpenAdd(){
    this.displayAddDialog= true
  }

  deleteCourse(courseId: number) {
    this.course.deleteCourse(courseId).subscribe(
      () => {
        this.loadCourses();
      },
      (error: any) => {
        console.error('Error deleting Course:', error);
        this.changeDetector.markForCheck();
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while deleting the Course.',
          icon: 'error',
        });
      }
    );
  }
}
