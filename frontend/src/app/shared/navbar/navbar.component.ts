import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn:boolean=false;
  dropdownOpen = false;
  profileDropdownOpen = false;

  constructor(private _auth:AuthService, private route:Router){
    this._auth.$authState.subscribe(status=>this.isLoggedIn=status)
  }
  categories = [
    { label: 'Web Development', value: 'Web Development' },
    { label: 'Data Science', value: 'Data Science' },
    { label: 'AI', value: 'AI' },
    { label: 'Design', value: 'Design' }
  ];
  searchQuery = '';

  filterCourses(category: string) {
    console.log('Selected Category:', category);  // Debugging
    // Apply filtering logic...
  }
  searchCourses(event:any){

  }
  
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleProfileDropdown() {
    this.profileDropdownOpen = !this.profileDropdownOpen;
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
