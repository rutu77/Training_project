import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guard/admin.guard';
import { AdminIndexComponent } from './admin-index/admin-index.component';

const routes: Routes = [
  {path:'updateRole',component:AdminIndexComponent,canActivate:[AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
