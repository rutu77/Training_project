import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from "sweetalert2"

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{
  errorMsg: string = '';
  secretKey:string='';

  constructor(private _admin:AdminService, private route:ActivatedRoute){}

  AdminRegisterForm= new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('',[Validators.minLength(8),Validators.required]),
    secretKey: new FormControl('',[Validators.required])
  })

  // ngOnInit(): void {
  //   this.secretKey= this.route.snapshot.paramMap.get('secretKey') || ''
  // }

  onSubmit(){
    alert("Registeration form submitted");
    this._admin.registerAdmin(this.AdminRegisterForm.value).subscribe(
    ()=>{
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
