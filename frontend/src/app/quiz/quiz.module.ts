import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AllProgressComponent } from './all-progress/all-progress.component';


@NgModule({
  declarations: [
    QuizListComponent,
    TakeQuizComponent,
    ProgressComponent,
    AddQuestionComponent,
    AllProgressComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class QuizModule { }
