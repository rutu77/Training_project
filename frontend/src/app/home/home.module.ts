import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { CourseListComponent } from './courselist/courselist.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import { EnrollComponent } from './enroll/enroll.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyLearningsComponent } from './my-learnings/my-learnings.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CourseModule } from '../course/course.module';
import { ProfileComponent } from './profile/profile.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { UpdateReviewComponent } from './update-review/update-review.component';
import { QuizModule } from '../quiz/quiz.module';

@NgModule({
  declarations: [
    HomeComponent, 
    HeaderComponent, 
    CourseListComponent, 
    ProfileComponent, 
    CoursedetailsComponent, 
    EnrollComponent,
    MyLearningsComponent, 
    AboutComponent, 
    ContactComponent, 
    ProfileComponent,
    AddReviewComponent,
    UpdateReviewComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CourseModule,
    QuizModule
  ]
})

export class HomeModule { }
