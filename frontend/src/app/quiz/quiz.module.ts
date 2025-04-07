import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { ProgressComponent } from './progress/progress.component';


@NgModule({
  declarations: [
    QuizListComponent,
    CreateQuizComponent,
    QuestionListComponent,
    CreateQuestionComponent,
    TakeQuizComponent,
    ProgressComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class QuizModule { }
