import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn:boolean=false;

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

  filterCourses(event:any){

  }

  searchCourses(event:any){

  }


  logout(){
      this._auth.logout()
      this.route.navigate(['/auth/login'])
    }

}
