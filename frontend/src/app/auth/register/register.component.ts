import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  passMismatch: boolean = false;

  constructor(private _auth: AuthService, private router: Router) {}

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), this.nameValidator()]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    requestedRole: new FormControl('user')
  });

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
      this._auth.Register(formValue).subscribe(
        (res: any) => {
          console.log("Registration form submitted");
          Swal.fire({
            title: "Good job!",
            text: res.message || "Registration Successful!",
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
