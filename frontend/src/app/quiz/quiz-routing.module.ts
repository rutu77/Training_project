import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { ProgressComponent } from './progress/progress.component';
import { AllProgressComponent } from './all-progress/all-progress.component';
import { teacherGuard } from '../guard/teacher.guard';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  {path:'managequiz',component:QuizListComponent, canActivate:[teacherGuard]},
  {path:'addQuestion/:id',component:AddQuestionComponent, canActivate:[teacherGuard]},
  {path:'takeQuiz/:id',component:TakeQuizComponent, canActivate:[AuthGuard]},
  {path:'progress',component:ProgressComponent, canActivate:[AuthGuard]},
  {path:'user-progress',component:AllProgressComponent, canActivate:[teacherGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
