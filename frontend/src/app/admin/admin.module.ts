import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';


@NgModule({
  declarations: [
    UpdateUserComponent,
    UserListComponent,
    AdminDashComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    AdminDashComponent
  ]
})
export class AdminModule { }
