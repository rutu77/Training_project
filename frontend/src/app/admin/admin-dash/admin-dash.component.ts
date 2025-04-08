import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dash',
  standalone: false,
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent {
  sidebarVisible:boolean=false

  constructor(private adminService:AdminService){}

  ngOnInit() {
    this.adminService.sidebarVisible$.subscribe(visible => {
      this.sidebarVisible = visible;
    });
  }

}
