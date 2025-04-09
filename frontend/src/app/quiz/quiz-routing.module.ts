import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { ProgressComponent } from './progress/progress.component';
import { AllProgressComponent } from './all-progress/all-progress.component';

const routes: Routes = [
  {path:'managequiz',component:QuizListComponent},
  {path:'addQuestion/:id',component:AddQuestionComponent},
  {path:'takeQuiz/:id',component:TakeQuizComponent},
  {path:'progress',component:ProgressComponent},
  {path:'user-progress',component:AllProgressComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
