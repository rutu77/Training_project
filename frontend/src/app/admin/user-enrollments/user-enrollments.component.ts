import { Component } from '@angular/core';
import { Enrollment } from '../../models/model';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-user-enrollments',
  standalone: false,
  templateUrl: './user-enrollments.component.html',
  styleUrl: './user-enrollments.component.css'
})
export class UserEnrollmentsComponent {
  enrollments:Enrollment[]=[]

  constructor(private homeService:HomeService){}

  ngOnInit(): void {
    this.loadEnrollments()
  }

  loadEnrollments(){
    this.homeService.getEnrollments().subscribe((data:any)=>{
      this.enrollments= data
      this.enrollments=this.enrollments.filter(enroll=>!enroll.deleted)
    })
  }

}
