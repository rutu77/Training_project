import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guard/admin.guard';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEnrollmentsComponent } from './user-enrollments/user-enrollments.component';


const routes: Routes = [
  {path:'userList',component:UserListComponent,canActivate:[AdminGuard]},
  {path:'updateUserRole',component:UpdateUserComponent,canActivate:[AdminGuard]},
  {path:'user-enrollments',component:UserEnrollmentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
