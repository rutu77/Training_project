import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { AdminService } from '../../admin/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  errorMsg: string = '';
  passMismatch: boolean = false;
  isAdmin: boolean = false;

  constructor(private _admin: AdminService, private _auth: AuthService, private route: ActivatedRoute) {}

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(8), Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    secretKey: new FormControl(''),
    role: new FormControl('user')
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const expectedSecretKey = 'bandu';
      if (params['key']===expectedSecretKey){
        this.isAdmin = true;
        this.registerForm.get('secretKey')?.setValidators([Validators.required]);
        this.registerForm.get('role')?.setValue('admin');
      }
    });
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

      alert("Registration form submitted");

      if (this.isAdmin) {
        this._admin.registerAdmin(formValue).subscribe(
          () => {
            console.log("Registration form submitted");
            Swal.fire({
              title: "Good job!",
              text: "Registration Successful!",
              icon: "success"
            });
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
      } else {
        this._auth.Register(formValue).subscribe(
          (res: any) => {
            console.log("Registration form submitted");
            Swal.fire({
              title: "Good job!",
              text: "Registration Successful!",
              icon: "success"
            });
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

// import { Component, OnInit } from '@angular/core';
// import { AdminService } from '../admin.service';
// import { AuthService } from '../auth.service';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {
//   errorMsg: string = '';
//   passMismatch: boolean = false;
//   isAdmin: boolean = false;
//   secretKeyValid: boolean = false;

//   constructor(private _admin: AdminService, private _auth: AuthService, private route: ActivatedRoute, private router: Router) {}

//   registerForm = new FormGroup({
//     name: new FormControl('', [Validators.required, Validators.minLength(3)]),
//     email: new FormControl('', [Validators.email, Validators.required]),
//     password: new FormControl('', [Validators.minLength(8), Validators.required]),
//     confirmPassword: new FormControl('', [Validators.required]),
//     secretKey: new FormControl(''),
//     role: new FormControl('user')
//   });

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       const secretKey = params['key'];
//       const expectedSecretKey = 'yourExpectedSecretKey'; // Replace with your actual secret key

//       if (secretKey) {
//         this.isAdmin = true;
//         this.secretKeyValid = secretKey === expectedSecretKey;

//         if (this.secretKeyValid) {
//           this.registerForm.get('secretKey')?.setValidators([Validators.required]);
//           this.registerForm.get('role')?.setValue('admin');
//         } else {
//           Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Invalid secret key!",
//           });
//           this.router.navigate(['/error']); // Redirect to an error page or another route
//         }
//       }
//     });
//   }

//   onSubmit() {
//     const password = this.registerForm.get('password')?.value;
//     const confirmPassword = this.registerForm.get('confirmPassword')?.value;

//     if (password !== confirmPassword) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Password and confirm password should be same!",
//       });
//       return;
//     } else {
//       this.passMismatch = false;
//     }

//     if (this.registerForm.valid) {
//       const formValue = { ...this.registerForm.value };
//       delete formValue.confirmPassword;

//       alert("Registration form submitted");

//       if (this.isAdmin) {
//         this._admin.registerAdmin(formValue).subscribe(
//           () => {
//             console.log("Registration form submitted");
//             Swal.fire({
//               title: "Good job!",
//               text: "Registration Successful!",
//               icon: "success"
//             });
//           },
//           (error: any) => {
//             console.error("Error during registration", error);
//             Swal.fire({
//               icon: "error",
//               title: "Oops...",
//               text: error.error.message || "Registration Failed!",
//             });
//           }
//         );
//       } else {
//         this._auth.Register(formValue).subscribe(
//           (res: any) => {
//             console.log("Registration form submitted");
//             Swal.fire({
//               title: "Good job!",
//               text: "Registration Successful!",
//               icon: "success"
//             });
//           },
//           (error: any) => {
//             console.error("Error during registration", error);
//             Swal.fire({
//               icon: "error",
//               title: "Oops...",
//               text: error.error.message || "Registration Failed!",
//             });
//           }
//         );
//       }
//     }
//   }
// }