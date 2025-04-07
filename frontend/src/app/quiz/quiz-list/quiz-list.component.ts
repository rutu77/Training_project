import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Quiz } from '../../models/model';

@Component({
  selector: 'app-quiz-list',
  standalone: false,
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.css'
})
export class QuizListComponent implements OnInit {
    quizzes: Quiz[] = [];
  
    constructor(private homeService: HomeService) {}
  
    ngOnInit(): void {
      this.homeService.getAllQuizzes().subscribe((data:any) =>{
        this.quizzes = data
      });
    }
  }
  