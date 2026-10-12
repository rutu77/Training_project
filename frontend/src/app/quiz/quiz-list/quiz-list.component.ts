import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Course, Quiz } from '../../models/model';
import { AuthSessionService } from '../../services/auth-session.service';
import { CourseService } from '../../services/course.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-quiz-list',
  standalone: false,
  templateUrl: './quiz-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './quiz-list.component.css'
})
export class QuizListComponent implements OnInit {
  quizzes: Quiz[] = [];
  courses: Course[] = [];
  quizForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    courseId: new FormControl<number | null>(null, [Validators.required])
  });
  editQuizForm = new FormGroup({
    title: new FormControl('', [Validators.required])
  });
  isLoading = true;
  isLoadingCourses = true;
  isCreatingQuiz = false;
  isSavingQuiz = false;
  courseLoadError: string | null = null;
  editingQuizId: number | null = null;
  userId: number | null;
  isAdmin: boolean;
  loadError = '';

  constructor(
    private homeService: HomeService,
    private courseService: CourseService,
    private session: AuthSessionService,
    private readonly changeDetector: ChangeDetectorRef
  ) {
    this.userId = this.session.getUserId();
    this.isAdmin = this.session.getRole() === 'admin';
  }

  ngOnInit(): void {
    this.loadCourses();
    this.loadQuizzes();
  }

  loadCourses(): void {
    this.isLoadingCourses = true;
    this.courseLoadError = null;
    this.courseService.getManageCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.isLoadingCourses = false;
        this.changeDetector.detectChanges();
      },
      error: (error: unknown) => {
        console.error('Error loading courses for quiz creation:', error);
        this.courseLoadError = 'Courses could not be loaded. Please try again.';
        this.isLoadingCourses = false;
        this.changeDetector.detectChanges();
      }
    });
  }

  loadQuizzes(): void {
    this.isLoading = true;
    this.loadError = '';
    this.quizzes = [];
    this.homeService.getAllQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data.filter((quiz) => !quiz.deleted);
        if (!this.isAdmin) {
          this.quizzes = this.quizzes.filter((quiz) => quiz.course?.creator?.id === this.userId);
        }
        this.isLoading = false;
        this.changeDetector.detectChanges();
      },
      error: (error: any) => {
        console.error('Error fetching quizzes:', error);
        this.isLoading = false;
        this.loadError = 'Quizzes could not be loaded. Please try again.';
        this.changeDetector.detectChanges();
      }
    });
  }

  createQuiz(): void {
    if (this.quizForm.invalid || this.isCreatingQuiz) {
      this.quizForm.markAllAsTouched();
      return;
    }
    const title = String(this.quizForm.controls.title.value ?? '').trim();
    const courseId = this.quizForm.controls.courseId.value;
    if (!title || courseId === null) return;

    this.isCreatingQuiz = true;
    this.homeService.createQuiz({ title, courseId }).subscribe({
      next: () => {
        this.quizForm.reset({ title: '', courseId: null });
        this.isCreatingQuiz = false;
        this.changeDetector.detectChanges();
        this.loadQuizzes();
        Swal.fire({
          icon: 'success',
          title: 'Quiz created',
          text: 'The quiz has been added to the selected course.',
        });
      },
      error: (error: any) => {
        console.error('Error creating quiz:', error);
        this.isCreatingQuiz = false;
        this.changeDetector.detectChanges();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error?.message || 'Failed to create quiz.',
        });
      }
    });
  }

  startEditing(quiz: Quiz): void {
    this.editingQuizId = quiz.id;
    this.editQuizForm.setValue({ title: quiz.title });
  }

  cancelEditing(): void {
    this.editingQuizId = null;
    this.editQuizForm.reset();
  }

  saveQuizTitle(quizId: number): void {
    if (this.editQuizForm.invalid || this.isSavingQuiz) {
      this.editQuizForm.markAllAsTouched();
      return;
    }
    const title = String(this.editQuizForm.controls.title.value ?? '').trim();
    if (!title) return;

    this.isSavingQuiz = true;
    this.homeService.updateQuiz(quizId, { title }).subscribe({
      next: () => {
        this.isSavingQuiz = false;
        this.cancelEditing();
        this.changeDetector.detectChanges();
        this.loadQuizzes();
        Swal.fire({ icon: 'success', title: 'Quiz updated', text: 'The quiz title was updated.' });
      },
      error: (error: any) => {
        console.error('Error updating quiz:', error);
        this.isSavingQuiz = false;
        this.changeDetector.detectChanges();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error?.message || 'Failed to update the quiz.',
        });
      }
    });
  }

  deleteQuiz(quizId: number): void {
    Swal.fire({
      title: 'Delete this quiz?',
      text: 'This removes the quiz from the course. Existing learner progress will be retained.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remove quiz',
      confirmButtonColor: '#c2413a',
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.homeService.deleteQuiz(quizId).subscribe({
        next: () => {
          this.quizzes = this.quizzes.filter((quiz) => quiz.id !== quizId);
          this.changeDetector.detectChanges();
          Swal.fire({ icon: 'success', title: 'Quiz removed', text: 'The quiz was removed. Existing learner progress has been retained.' });
        },
        error: (error: any) => {
          console.error('Error deleting quiz:', error);
          this.changeDetector.detectChanges();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error?.message || 'Failed to delete quiz.',
          });
        }
      });
    });
  }
}
