import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  passMismatch: boolean = false;
  isAdmin: boolean = false;

  constructor(private _admin: AdminService, private _auth: AuthService, private route: ActivatedRoute,private router:Router) {}

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), this.nameValidator()]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    secretKey: new FormControl(''),
    role: new FormControl('user')
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const expectedSecretKey = 'iamadmin';
      if (params['key']===expectedSecretKey){
        localStorage.setItem('user_role','admin')
        this.isAdmin=this._auth.getRole()==="admin"
        
        this.registerForm.get('secretKey')?.setValidators([Validators.required]);
        this.registerForm.get('role')?.setValue('admin');
      }
    });
  }

  nameValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
        const name = control.value;
        const valid = /^[a-zA-Z\s]+$/.test(name);
        return valid ? null : { invalidName: 'Name must contain only letters and spaces' };
    };
  }

  onSubmit() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password and confirm password should be same!",
      });
      return;
    } else {
      this.passMismatch = false;
    }

    if (this.registerForm.valid) {
      const formValue = { ...this.registerForm.value };
      delete formValue.confirmPassword;

      if (this.isAdmin) {
        this._admin.registerAdmin(formValue).subscribe(
          () => {
            console.log("Registration form submitted");
            Swal.fire({
              title: "Good job!",
              text: "Registration Successful!",
              icon: "success"
            });
            this.router.navigate(['/auth/login'])
          },
          (error: any) => {
            console.error("Error during registration", error);
            localStorage.setItem('admin','false')
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.error.message || "Registration Failed!",
            });
          }
        );
      } else {
        this._auth.Register(formValue).subscribe(
          (res: any) => {
            console.log("Registration form submitted");
            Swal.fire({
              title: "Good job!",
              text: "Registration Successful!",
              icon: "success"
            });
            this.router.navigate(['/auth/login'])
          },
          (error: any) => {
            console.error("Error during registration", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.error.message || "Registration Failed!",
            });
          }
        );
      }
    }
  }
}
