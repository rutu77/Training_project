import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { CourseListComponent } from './courselist/courselist.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import { EnrollComponent } from './enroll/enroll.component';
import { AuthGuard } from '../guard/auth.guard';
import { AddCourseComponent } from './add-course/add-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { DeleteCourseComponent } from './delete-course/delete-course.component';
import { MyLearningsComponent } from './my-learnings/my-learnings.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:'courses',component:CourseListComponent},
  {path:'course/:id',component:CoursedetailsComponent},
  {path: 'enrollment', component: EnrollComponent, canActivate:[AuthGuard] },
  {path:'addCourse',component:AddCourseComponent},
  {path:'updateCourse',component:UpdateCourseComponent},
  {path:'deleteCourse',component:DeleteCourseComponent},
  {path:'mylearnings',component:MyLearningsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
