import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CourseService } from '../../home/course.service';
import { Course } from '../../models/model';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn:boolean=false;
  dropdownOpen = false;
  profileDropdownOpen:boolean = false;
  courseDropdownOpen = false;
  isTeacher:boolean=false;
  isAdmin:boolean=false;
  courses:Course[]=[]
  filteredCourses:Course[]=[]

  constructor(private _auth:AuthService, private route:Router, private courseService:CourseService){
    this._auth.$authState.subscribe(status=>this.isLoggedIn=status)
    this._auth.$role.subscribe(role=>this.isTeacher=role==='teacher')
    this._auth.$role.subscribe(role=>this.isAdmin=role==='admin')
  }

  categories = [
    { label: 'Web Development', value: 'Web Development' },
    { label: 'Data Science', value: 'Data Science' },
    { label: 'AI', value: 'AI' },
    { label: 'Design', value: 'Design' }
  ];

  searchQuery = '';

  ngOnInit():void{
    this.courseService.getCourses().subscribe((data:any)=>{
      this.courses=data;
      this.filteredCourses=data;
    })
  }


  filterCourses(tag: string) {
    this.filteredCourses = this.courses.filter(course => course.tags?.includes(tag));
  }

  searchCourses(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredCourses = this.courses.filter(course => course.title.toLowerCase().includes(query) || course.description.toLowerCase().includes(query));
  }

  
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleProfileDropdown() {
    this.profileDropdownOpen = !this.profileDropdownOpen;
  }

  toggleCourseDropdown() {
    this.courseDropdownOpen = !this.courseDropdownOpen;
  }


  logout(){
      this._auth.logout()
      this.showLogoutSuccess()
      this.route.navigate(['/auth/login'])
  }

  showLogoutSuccess() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Logout successfully'
    })
  }
}
