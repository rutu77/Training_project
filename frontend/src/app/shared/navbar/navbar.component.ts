import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HomeService } from '../../services/home.service';
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

  // @Output() filterByTag= new EventEmitter<string>()
  @Output() search= new EventEmitter<string>();

  constructor(private _auth:AuthService, private route:Router, private homeService:HomeService){
    this._auth.$authState.subscribe(status=>this.isLoggedIn=status)
    this._auth.$role.subscribe(role=>this.isTeacher=role==='teacher')
    this._auth.$role.subscribe(role=>this.isAdmin=role==='admin')
  }

  // categories = [
  //   { label: 'Web Development', value: 'Web Development' },
  //   { label: 'Data Science', value: 'Data Science' },
  //   { label: 'AI', value: 'AI' },
  //   { label: 'Design', value: 'Design' },
  //   { label: 'Angular', value: 'Angular' }
  // ];

  // onFilter(tag: string) {
  //   this.filterByTag.emit(tag)
  //   // console.log("tag from navbar", tag);
  // }

  searchCourses(event: any) {
   const searchQuery= event.target.value
    // console.log(searchQuery);
    this.search.emit(searchQuery)
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
