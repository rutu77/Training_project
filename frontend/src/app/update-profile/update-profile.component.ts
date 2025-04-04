import { Component } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-update-profile',
  standalone: false,
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {

//   userId = Number(localStorage.getItem("userId"));

//   userProfileForm!: FormGroup;

//   constructor(private fb: FormBuilder, private messageService: MessageService, private router: Router, private _home: HomeService) { }

//   ngOnInit() {
//     this.userProfileForm = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//     });

//     this.loadUserProfile();
//   }

//   loadUserProfile() {
//     this._home.getUserById(this.userId).subscribe((data: any) => {
//       this.userProfileForm.patchValue({
//         firstName: data.firstName,
//         lastName: data.lastName,
//         email: data.email,
//         phone: data.phone,
//       });
//     });
//   }

//   onSubmit() {
//     if (this.userProfileForm.invalid) return;

//     const updatedProfile = {
//       ...this.userProfileForm.value,
//     };

//     this._home.updateUser(this.userId, updatedProfile).subscribe(
//       () => {
//         Swal.fire({
//           title: 'Profile Updated',
//           text: 'Your profile has been updated successfully!',
//           icon: 'success',
//         });
//       },
//       (error: any) => {
//         console.error('Error updating profile:', error);
//         Swal.fire({
//           title: 'Error',
//           text: 'An error occurred while updating your profile.',
//           icon: 'error',
//         });
//       }
//     );
//   }

  

// }
  
  

    selectedFile: File | null = null;
    message: string = '';
    userId= Number(localStorage.getItem("userId"))

  
    constructor(private userService: HomeService) {}
  
    onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
    }
  
    onUpload(): void {
      if (!this.selectedFile) {
        this.message = 'Please select a file to upload.';
        return;
      }
  
      this.userService.uploadProfilePicture(this.userId, this.selectedFile).subscribe(
        (response) => {
          this.message = response.message || 'Profile picture uploaded successfully!';
        },
        (error) => {
          this.message = error.error?.error || 'Error uploading profile picture.';
        }
      );
    }
  }