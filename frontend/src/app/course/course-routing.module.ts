import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './add-course/add-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { DeleteCourseComponent } from './delete-course/delete-course.component';
import { AddlessonsComponent } from './addlessons/addlessons.component';
import { UpdatelessonComponent } from './updatelesson/updatelesson.component';
import { LessondetailsComponent } from './lessondetails/lessondetails.component';
import { DeletelessonComponent } from './deletelesson/deletelesson.component';

const routes: Routes = [
  {path:'addCourse',component:AddCourseComponent},
    {path:'updateCourse/:id',component:UpdateCourseComponent},
    // {path:'updateCourse',component:UpdateCourseComponent},
    {path:'deleteCourse',component:DeleteCourseComponent},
    {path:'addLesson', component:AddlessonsComponent},
    {path:'updateLesson/:id',component:UpdatelessonComponent},
    {path:'deleteLesson',component:DeletelessonComponent},
    {path:'lesson/:id',component:LessondetailsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
