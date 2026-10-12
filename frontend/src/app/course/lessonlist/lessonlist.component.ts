import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Lesson } from '../../models/model';
import { CourseService } from '../../services/course.service';
import { AuthSessionService } from '../../services/auth-session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lessonlist',
  standalone: false,
  templateUrl: './lessonlist.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './lessonlist.component.css',
})
export class LessonlistComponent implements OnInit {
  get userId(): number | null {
    return this.session.getUserId();
  }
  lessons: Lesson[] = [];

  displayUpdateDialog = false;
  displayAddDialog=false;
  selectedLessonId!: number;
  isLoading = true;
  loadError = '';
  isAdmin = false;

  constructor(
    private courseService: CourseService,
    private session: AuthSessionService,
    private readonly changeDetector: ChangeDetectorRef
  ) {
    this.isAdmin = this.session.getRole() === 'admin';
  }

  ngOnInit(): void {
    this.loadLessons();
  }

  loadLessons() {
    const userId = this.userId;
    if (userId === null) {
      this.lessons = [];
      this.isLoading = false;
      this.changeDetector.detectChanges();
      return;
    }
    this.isLoading = true;
    this.loadError = '';
    this.courseService.getLessons().subscribe({
      next: (data) => {
        this.lessons = data
          .filter((lesson) => !lesson.deleted)
          .filter((lesson) => this.isAdmin || lesson.course.creator?.id === userId);
        this.isLoading = false;
        this.changeDetector.detectChanges();
      },
      error: (error: unknown) => {
        console.error('Error loading lessons:', error);
        this.lessons = [];
        this.isLoading = false;
        this.loadError = 'Lessons could not be loaded. Please try again.';
        this.changeDetector.detectChanges();
      },
    });
  }

  refresh() {
    this.loadLessons();
    this.displayUpdateDialog = false;
    this.displayAddDialog= false
  }

  onOpenUpdate(id: number) {
    this.selectedLessonId = id;
    this.displayUpdateDialog = true;
  }

  onOpenAdd(){
    this.displayAddDialog= true
  }

  deleteLesson(lessonId: number) {
    this.courseService.deleteLesson(lessonId).subscribe(
      () => {
        this.loadLessons();
      },
      (error: any) => {
        console.error('Error deleting lesson:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while deleting the lesson.',
          icon: 'error',
        });
        this.changeDetector.markForCheck();

      }
    );
  }
}
