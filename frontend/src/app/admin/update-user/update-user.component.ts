import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  standalone: false,
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{

  @Input() userId!: number;
  @Output() userUpdated = new EventEmitter<void>();
 

  updateUserForm!: FormGroup;

  constructor(private admin: AdminService) {}

  roles = [
    { label: 'User', value: 'user' },
    { label: 'Teacher', value: 'teacher' },
    { label: 'Admin', value: 'admin' }
  ];

  ngOnInit(): void {
    this.updateUserForm = new FormGroup({
      role: new FormControl(''),
    });
  }

  ngOnChanges(){
    this.loadUserData();
  }

  loadUserData() {
    if (this.userId) {
      this.admin.getUserById(this.userId).subscribe((res: any) => {
        this.updateUserForm.patchValue({
          role: res.data.role,
        });
      });
    }
  }

  onSubmit() {
    if (this.updateUserForm.invalid) return;

    this.admin.updateUser(this.userId, this.updateUserForm.value).subscribe(
      () => {
        Swal.fire({
          title: 'User Updated',
          text: 'The user has been updated successfully!',
          icon: 'success',
        });
        this.userUpdated.emit();
      },
      (error: any) => {
        console.error('Error updating user:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while updating the user.',
          icon: 'error',
        });
        this.userUpdated.emit();
      }
    );
  }
}

