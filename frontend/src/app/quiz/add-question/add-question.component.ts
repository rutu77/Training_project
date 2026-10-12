import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Quiz } from '../../models/model';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-add-question',
  standalone: false,
  templateUrl: './add-question.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit {
  quiz: Quiz | null = null;
  questionForm = new FormGroup({
    question: new FormControl('', [Validators.required]),
    options: new FormControl('', [Validators.required]),
    correctAnswer: new FormControl('', [Validators.required]),
    explanation: new FormControl('')
  });
  isLoading = true;
  isSaving = false;
  loadError = '';

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadQuiz();
  }

  loadQuiz(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isSafeInteger(id) || id <= 0) {
      this.loadError = 'This quiz could not be found.';
      this.isLoading = false;
      this.changeDetector.markForCheck();
      return;
    }
    this.isLoading = true;
    this.loadError = '';
    this.homeService.getQuizById(id).subscribe({
      next: (response) => {
        this.quiz = {
          ...response.data,
          questions: response.data.questions.filter((question) => !question.deleted)
        };
        this.isLoading = false;
        this.changeDetector.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading quiz questions:', error);
        this.quiz = null;
        this.loadError = error.error?.message || 'Quiz questions could not be loaded. Please try again.';
        this.isLoading = false;
        this.changeDetector.markForCheck();
      }
    });
  }

  addQuestion(): void {
    if (!this.quiz || this.questionForm.invalid || this.isSaving) {
      this.questionForm.markAllAsTouched();
      return;
    }

    const values = this.questionForm.getRawValue();
    const options = String(values.options ?? '').split(',').map((option) => option.trim()).filter(Boolean);
    const correctAnswer = String(values.correctAnswer ?? '').trim();
    if (options.length < 2 || !options.includes(correctAnswer)) {
      this.questionForm.controls.options.setErrors({ invalidOptions: true });
      this.questionForm.controls.correctAnswer.setErrors({ answerNotInOptions: true });
      return;
    }

    this.isSaving = true;
    this.homeService.addQuestiontoQuiz(this.quiz.id, {
      question: String(values.question ?? '').trim(),
      options,
      correctAnswer,
      explanation: String(values.explanation ?? '').trim()
    }).subscribe({
      next: (question) => {
        this.quiz?.questions.push(question);
        this.questionForm.reset();
        this.isSaving = false;
        this.changeDetector.markForCheck();
        Swal.fire({ icon: 'success', title: 'Question added', text: 'The question has been added to this quiz.' });
      },
      error: (error: any) => {
        console.error('Error adding question:', error);
        this.isSaving = false;
        this.changeDetector.markForCheck();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error?.message || 'Failed to add the question.'
        });
      }
    });
  }

  deleteQuestion(questionId: number): void {
    this.homeService.deleteQuestion(questionId).subscribe({
      next: () => {
        if (this.quiz) this.quiz.questions = this.quiz.questions.filter((question) => question.id !== questionId);
        this.changeDetector.markForCheck();
        Swal.fire({ icon: 'success', title: 'Question deleted', text: 'The question was removed from this quiz.' });
      },
      error: (error: any) => {
        console.error('Error deleting question:', error);
        this.changeDetector.markForCheck();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error?.message || 'Failed to delete the question.'
        });
      }
    });
  }
}
