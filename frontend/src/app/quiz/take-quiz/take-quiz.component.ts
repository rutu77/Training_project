import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../models/model';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-take-quiz',
  standalone: false,
  templateUrl: './take-quiz.component.html',
  styleUrl: './take-quiz.component.css'
})
export class TakeQuizComponent implements OnInit {
    @Input() quizId!: number;
    questions: Question[] = [];
    userAnswers: string[] = [];
    resultShown = false;
    score = 0;
  
    constructor(private homeService: HomeService) {}
  
    ngOnInit(): void {
      this.homeService.getQuestionsByQuiz(this.quizId).subscribe((data:any) => {
        this.questions = data;
        this.userAnswers = new Array(data.length).fill('');
      });
    }
  
    submitQuiz() {
      this.score = this.questions.reduce((acc, q, i) => {
        return acc + (q.correctAnswer === this.userAnswers[i] ? 1 : 0);
      }, 0);
      this.resultShown = true;
    }
  }
  