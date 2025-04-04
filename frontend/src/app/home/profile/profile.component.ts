import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { HomeService } from '../../services/home.service';
import { User } from '../../models/model';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
    userId = Number(localStorage.getItem("userId"));
    user: User | undefined;
    showUpdateForm = false;
    updateUserForm!: FormGroup;

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
  
    constructor(private home: HomeService, private fb: FormBuilder) {}
  
    ngOnInit() {
      this.home.getUserById(this.userId).subscribe((data: any) => {
        this.user = data.data;
        this.initializeForm();
      });
    }
  
    initializeForm() {
      this.updateUserForm = this.fb.group({
        name: [this.user?.name],
        profilePicture: [this.user?.profilePicture],
        bio: [this.user?.bio],
        email: [this.user?.email, [Validators.email]],
      });
    }
  
    onSubmit() {
      if (this.updateUserForm.invalid) return;
  
      const updatedProfile = {
        ...this.updateUserForm.value,
      };
  
      this.home.updateUser(this.userId, updatedProfile).subscribe(
        () => {
          Swal.fire({
            title: 'Profile Updated',
            text: 'Your profile has been updated successfully!',
            icon: 'success',
          });
          this.showUpdateForm = false;
          this.user = updatedProfile;
        },
        (error: any) => {
          console.error('Error updating profile:', error);
          Swal.fire({
            title: 'Error',
            text: 'An error occurred while updating your profile.',
            icon: 'error',
          });
        }
      );
    }
  }
  