import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

export class ProfileComponent implements OnInit{

  userId = Number(localStorage.getItem("userId"));
  user: User | undefined;
  showUpdateForm = false;
  updateUserForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private home: HomeService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();

    this.home.getUserById(this.userId).subscribe((data: any) => {
      this.user = data.data;
      this.updateUserForm.patchValue({
        name: this.user?.name,
        profilePicture: this.user?.profilePicture,
        bio: this.user?.bio,
        email: this.user?.email,
      });
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.updateUserForm.invalid) return;

    if (this.updateUserForm.value.password !== this.updateUserForm.value.cpassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Please make sure your passwords match!',
      });
      return;
    }

    const updatedUser = this.getUpdatedValues(this.updateUserForm.value);
  
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
      (data: any) => {
        Swal.fire({
          title: 'Profile Updated',
          text: 'Your profile has been updated successfully!',
          icon: 'success',
        });
        this.showUpdateForm = false;
        this.user = data.data;
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

  private getUpdatedValues(formValues: any): any {
    const updatedValues: any = {};
    for (const key in formValues) {
      if (formValues[key] !== '') {
        updatedValues[key] = formValues[key];
      }
    }
    return updatedValues;
  }
}
