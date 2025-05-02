import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  array=[{id:1,name:"rutuja"},{id:2,name:"abc"},{id:3,name:"xyz"},{id:4,name:"lmn"}]

  constructor(private _auth:AuthService, private router:Router){}

  loginForm= new FormGroup({
    email: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('',[Validators.minLength(8),Validators.required])
  })



  onSubmit(){
    this._auth.Login(this.loginForm.value);
    this.router.navigate(['/home']);
  }

  // deleteFromArray(index:number){
  //   this.array.splice(index,1)
  // }
}
