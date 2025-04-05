import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { LessonlistComponent } from './lessonlist/lessonlist.component';
import { LessondetailsComponent } from './lessondetails/lessondetails.component';
import { AddlessonsComponent } from './addlessons/addlessons.component';
import { UpdatelessonComponent } from './updatelesson/updatelesson.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddCourseComponent } from './add-course/add-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { SharedModule } from '../shared/shared.module';
import { GenericListComponent } from '../shared/generic-list/generic-list.component';



@NgModule({
  declarations: [
    LessonlistComponent,
    LessondetailsComponent,
    AddlessonsComponent,
    UpdatelessonComponent,
    AddCourseComponent,
    UpdateCourseComponent,

  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    AddlessonsComponent
  ]
})
export class CourseModule { }
