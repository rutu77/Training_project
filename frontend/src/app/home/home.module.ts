import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CourseListComponent } from './courselist/courselist.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import { EnrollComponent } from './enroll/enroll.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { DeleteCourseComponent } from './delete-course/delete-course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyLearningsComponent } from './my-learnings/my-learnings.component';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, FooterComponent, CourseListComponent, CoursedetailsComponent, EnrollComponent, AddCourseComponent, UpdateCourseComponent, DeleteCourseComponent,MyLearningsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})

export class HomeModule { }
