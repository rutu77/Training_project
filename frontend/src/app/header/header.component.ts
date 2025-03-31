import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone:false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  activeUserData: any;

  profile: boolean = true;

  showLogin : boolean = true;

  showLogout : boolean = false

  showRegister : boolean = true

  showProfile : boolean = false;

  sidebarVisible : boolean = false;

  showAddArticleOption : boolean = false;

  completeProfile : boolean = false;
  

  showCompleteProfileBtn :boolean = true;

  value!: number;

  showAdminDashboard : boolean = false;

  constructor(private router : Router) {

    if(localStorage.getItem('loggedIn'))
    {
        this.showLogin = false;
        this.showLogout = true;
        this.showRegister = false;
        this.showProfile = true;
        this.showAddArticleOption = true;
    }
  }

  ngOnInit() {

    this.getActiveUser();

    if(this.activeUserData.role == 'admin')
    {
      this.showAdminDashboard = true;
    }

  }

  // getting data from localstorage
  getActiveUser() {
    this.activeUserData = JSON.parse(localStorage.getItem('loggedIn') || '{}');
    
  }

  scrollWindow() {
    window.scrollBy({
      top: 500,
      left: 0,
      behavior: "smooth",
    });
  }

  onLogout()
  {
    localStorage.removeItem('loggedIn');
    this.showLogoutSuccess();
    this.router.navigate(['/auth/login']);
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


  onProfileClick()
  {
    this.sidebarVisible = true;
  }

  myArticles()
  {
      this.router.navigate(['/courses'])
  }

  completeProfileBtn()
  {
      this.showCompleteProfileBtn = false;
      this.router.navigate(['/profile']);
  }

}