import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Question } from '../../models/model';

@Component({
  selector: 'app-create-question',
  standalone: false,
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.css'
})
export class CreateQuestionComponent {
    @Input() quizId!: number;
    @Output() questionCreated = new EventEmitter<void>();
  
    questionText = '';
    options: string[] = ['', '', '', ''];
    correctAnswer = '';
    explanation = '';
  
    constructor(private homeService: HomeService) {}
  
    createQuestion() {
      const question: Question = {
        id: this.quizId,
        question: this.questionText,
        options: this.options,
        correctAnswer: this.correctAnswer,
        explanation: this.explanation,
      };
  
      this.homeService.addQuestion(question).subscribe(() => {
        this.questionCreated.emit();
        this.resetForm();
      });
    }
  
    resetForm() {
      this.questionText = '';
      this.options = ['', '', '', ''];
      this.correctAnswer = '';
      this.explanation = '';
    }
  }
  