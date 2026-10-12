import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { HomeService } from '../../services/home.service';
import { AuthSessionService } from '../../services/auth-session.service';
import { User } from '../../models/model';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit{

  private readonly userId: number | null;
  user: User | undefined;
  showUpdateForm = false;
  updateUserForm!: FormGroup;
  selectedFile: File | null = null;
  isLoading = true;
  loadError = '';

  constructor(
    private home: HomeService,
    private fb: FormBuilder,
    private session: AuthSessionService,
    private readonly changeDetector: ChangeDetectorRef
  ) {
    this.userId = this.session.getUserId();
  }

  ngOnInit() {
    this.initializeForm();
    if (this.userId === null) {
      this.loadError = 'Sign in to view your profile.';
      this.isLoading = false;
      return;
    }

    this.loadProfile();
  }

  loadProfile(): void {
    if (this.userId === null) {
      this.loadError = 'Sign in to view your profile.';
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    this.loadError = '';
    this.home.getUserById(this.userId).subscribe({
      next: (data) => {
        this.user = data.data;
        this.updateUserForm.patchValue({
          name: this.user.name,
          profilePicture: this.user.profilePicture,
          bio: this.user.bio,
          email: this.user.email,
        });
        this.isLoading = false;
        this.changeDetector.markForCheck();
      },
      error: (error: any) => {
        console.error('Error loading profile:', error);
        this.loadError = error.error?.message || 'Your profile could not be loaded. Please try again.';
        this.isLoading = false;
        this.changeDetector.markForCheck();
      }
    });
  }

  initializeForm() {
    this.updateUserForm = this.fb.group({
      name: [''],
      profilePicture: [''],
      bio: [''],
      email: [''],
      password: ['', [Validators.minLength(6)]],
      cpassword: ['', [Validators.minLength(6)]],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  onSubmit() {
    if (this.userId === null) return;
    if (this.updateUserForm.invalid) return;

    if (this.updateUserForm.value.password !== this.updateUserForm.value.cpassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Please make sure your passwords match!',
      });
      return;
    }

    const updatedUser = this.updateUserForm.value;
  
    const formData = new FormData();

    if (updatedUser.password) {
      formData.append('password', updatedUser.password);
    }

    formData.append('name', updatedUser.name);
    formData.append('bio', updatedUser.bio);
    formData.append('email', updatedUser.email);
    // formData.append('password', updatedUser.password);

    if (this.selectedFile) {
      formData.append('profilePicture', this.selectedFile, this.selectedFile.name);
    }

    this.home.updateUser(this.userId, formData).subscribe(
      (data) => {
        Swal.fire({
          title: 'Profile Updated',
          text: 'Your profile has been updated successfully!',
          icon: 'success',
        });
        this.showUpdateForm = false;
        this.user = data.data;
        this.updateUserForm.patchValue({
          name: this.user.name,
          profilePicture: this.user.profilePicture,
          bio: this.user.bio,
          email: this.user.email,
          password: '',
          cpassword: '',
        });
        this.selectedFile = null;
        this.changeDetector.markForCheck();
      },
      (error: any) => {
        console.error('Error updating profile:', error);
        this.changeDetector.markForCheck();
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while updating your profile.',
          icon: 'error',
        });
      }
    );
  }
}
