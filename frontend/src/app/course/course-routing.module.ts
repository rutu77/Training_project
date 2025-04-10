import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './add-course/add-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { AddlessonsComponent } from './addlessons/addlessons.component';
import { UpdatelessonComponent } from './updatelesson/updatelesson.component';
import { LessondetailsComponent } from './lessondetails/lessondetails.component';
import { LessonlistComponent } from './lessonlist/lessonlist.component';
import { ManageCourseListComponent } from './manage-course-list/manage-course-list.component';
import { teacherGuard } from '../guard/teacher.guard';


const routes: Routes = [
  {path:'addCourse',component:AddCourseComponent, canActivate:[teacherGuard]},
  {path:'updateCourse/:id',component:UpdateCourseComponent, canActivate:[teacherGuard]},
  // {path:'updateCourse',component:UpdateCourseComponent},
  {path:'addLesson', component:AddlessonsComponent, canActivate:[teacherGuard]},
  {path:'updateLesson/:id',component:UpdatelessonComponent, canActivate:[teacherGuard]},
  {path:'lesson/:id',component:LessondetailsComponent},
  {path:'lessonlist',component:LessonlistComponent},
  {path:'courselist',component:ManageCourseListComponent, canActivate:[teacherGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
