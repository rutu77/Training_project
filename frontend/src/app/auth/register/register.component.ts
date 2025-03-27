import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  errorMsg: string = '';

  constructor(private _auth:AuthService){}

  registerForm= new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('',[Validators.minLength(8),Validators.required]),
    role: new FormControl('user')
  })


  onSubmit(){
    alert("Registeration form submitted");
    this._auth.Register(this.registerForm.value).subscribe(
    (res:any)=>{
      console.log("Registeration form submitted");
      Swal.fire({
        title: "Good job!",
        text: "Registeration Successful!",
        icon: "success"
      });
    },
    (error:any)=>{
      console.error("Error during registeration",error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.error.message||"Registeration Failed!",
      });
    })
  }
}
