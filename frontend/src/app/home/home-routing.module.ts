import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { CourseListComponent } from './courselist/courselist.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import { EnrollComponent } from './enroll/enroll.component';
import { AuthGuard } from '../guard/auth.guard';
import { MyLearningsComponent } from './my-learnings/my-learnings.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:'courses',component:CourseListComponent},
  {path:'course/:id',component:CoursedetailsComponent},
  {path: 'enrollment', component: EnrollComponent, canActivate:[AuthGuard] },
  {path:'mylearnings',component:MyLearningsComponent, canActivate:[AuthGuard]},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'profile',component:ProfileComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
