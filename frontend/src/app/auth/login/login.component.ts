import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSubmitting = false;

  constructor(
    private _auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  loginForm= new FormGroup({
    email: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('',[Validators.minLength(8),Validators.required])
  })



  onSubmit(){
    if (this.loginForm.invalid || this.isSubmitting) return;
    const credentials = this.loginForm.getRawValue();
    if (typeof credentials.email !== 'string' || typeof credentials.password !== 'string') return;

    this.isSubmitting = true;
    this._auth.Login({
      email: credentials.email,
      password: credentials.password,
    }).subscribe({
      next: (response) => {
        this._auth.setSession(
          response.data.token,
          response.data.user.role,
          response.data.user.id
        );
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        const destination = returnUrl?.startsWith('/') && !returnUrl.startsWith('//')
          ? returnUrl
          : '/home';
        this.isSubmitting = false;
        void this.router.navigateByUrl(destination);
      },
      error: (error: any) => {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: error.error?.message || 'Please check your credentials and try again.',
        });
      }
    });
  }

  // deleteFromArray(index:number){
  //   this.array.splice(index,1)
  // }
}
