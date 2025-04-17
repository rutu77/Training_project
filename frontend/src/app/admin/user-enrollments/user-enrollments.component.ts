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
  filterEnrolls:Enrollment[]=[]
  searchText:string=''

  constructor(private homeService:HomeService){}

  ngOnInit(): void {
    this.loadEnrollments()
  }

  loadEnrollments(){
    this.homeService.getEnrollments().subscribe((data:any)=>{
      this.enrollments= data
      this.enrollments=this.enrollments.filter(enroll=>!enroll.deleted)
      this.filterEnrolls=[...this.enrollments]
    })
  }

  filterEnrollments(): void {
    this.filterEnrolls = this.enrollments.filter(enroll =>
      enroll.user.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      enroll.course.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      enroll.user.id.toString().includes(this.searchText.toLowerCase())||
      enroll.course.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

}
