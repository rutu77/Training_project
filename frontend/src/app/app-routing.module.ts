import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { combineLatest } from 'rxjs';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)},
  {path:'auth',loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)},
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:'course',loadChildren:()=>import('./course/course.module').then(m=>m.CourseModule)},
  {path:'quiz',loadChildren:()=>import('./quiz/quiz.module').then(m=>m.QuizModule)},
  {path:'**',component:NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
