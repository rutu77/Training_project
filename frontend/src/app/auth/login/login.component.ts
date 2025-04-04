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

  errorMsg:string=''

  constructor(private _auth:AuthService, private router:Router){}

  loginForm= new FormGroup({
    email: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('',[Validators.minLength(8),Validators.required])
  })

    onSubmit() {
      this._auth.Login(this.loginForm.value);
      this._auth.$authState.subscribe(isLoggedIn => {
        if (isLoggedIn) {
          Swal.fire({
            title: "Good job!",
            text: "Login Successful!",
            icon: "success"
          });
          this.router.navigate(['/home']);
        }
      })
  }
    // onSubmit(){
  //   this._auth.Login(this.loginForm.value).subscribe(
  //       (res: any) => {
  //         console.log("Login form submitted");
  //       localStorage.setItem('token', res.data.token);
  //         Swal.fire({
  //           title: "Good job!",
  //           text: "Login Successful!",
  //           icon: "success"
  //         });
  //         if (this._auth.isLoggedIn()) { 
  //           this.router.navigate(['/index'])
  //         }
          
  //     },
  //       (error: any) => {
  //           console.error("Error during login:", error);
  //           Swal.fire({
  //             icon: "error",
  //             title: "Oops...",
  //             text: error.error.message||"Invalid Credentials!!",
  //           });
  //       }
  //   );
  // }
}
