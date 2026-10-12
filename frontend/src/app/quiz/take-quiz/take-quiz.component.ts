import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Quiz } from '../../models/model';
import { HomeService } from '../../services/home.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-take-quiz',
  standalone: false,
  templateUrl: './take-quiz.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './take-quiz.component.css'
})
export class TakeQuizComponent implements OnInit {

    quiz: Quiz | null = null;
    quizForm: FormGroup;
    isLoading = true;
    isSubmitting = false;
    loadError = '';
    submitError = '';
  
    constructor(
      private route: ActivatedRoute,
      private homeService: HomeService,
      private router: Router,
      private readonly changeDetector: ChangeDetectorRef
    ) {
      this.quizForm = new FormGroup({});
    }
  
    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (!Number.isSafeInteger(id) || id <= 0) {
        this.loadError = 'This quiz could not be found.';
        this.isLoading = false;
        this.changeDetector.markForCheck();
        return;
      }
      this.homeService.getQuizById(id).subscribe({
        next: (response) => {
          this.quiz = {
            ...response.data,
            questions: response.data.questions.filter(question => !question.deleted)
          };
          this.initializeForm();
          this.isLoading = false;
          this.changeDetector.markForCheck();
        },
        error: (error: any) => {
          console.error('Error loading quiz:', error);
          this.loadError = error.error?.message || 'The quiz could not be loaded. Please try again.';
          this.isLoading = false;
          this.changeDetector.markForCheck();
        }
      });
    }
  
    initializeForm(): void {
      this.quiz?.questions.filter(question => !question.deleted).forEach(question => {
        this.quizForm.addControl(String(question.id), new FormControl('', Validators.required));
      });
    }

    submitQuiz(): void {
      if (this.quiz?.id && this.quizForm.valid && !this.isSubmitting) {
        this.isSubmitting = true;
        this.submitError = '';
        const answers = this.quizForm.value;
        this.homeService.submitQuiz(this.quiz.id, { answers }).subscribe({
          next: () => {
            this.isSubmitting = false;
            this.changeDetector.markForCheck();
            Swal.fire({
              icon: 'success',
              title: 'Submitted',
              text: 'Quiz submitted successfully!',
            });
            const courseId = this.quiz?.course?.id;
            if (courseId !== undefined) {
              this.router.navigate([`/home/course/${courseId}`]);
            }
          },
          error: (error: any) => {
            console.error('Error submitting quiz:', error);
            this.isSubmitting = false;
            this.submitError = error.error?.message || 'Failed to submit quiz. Please try again.';
            this.changeDetector.markForCheck();
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: this.submitError,
            });
          }
        });
      }
    }
  }
  
