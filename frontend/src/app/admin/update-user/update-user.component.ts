import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  standalone: false,
  templateUrl: './update-user.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{

  @Input() userId!: number;
  @Output() userUpdated = new EventEmitter<void>();
 

  updateUserForm!: FormGroup;
  private userEmail = '';

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
    this.loadUserData();
  }

  ngOnChanges(){
    if (this.updateUserForm) this.loadUserData();
  }

  loadUserData() {
    if (this.userId) {
      this.admin.getUserById(this.userId).subscribe((res) => {
        this.userEmail = res.data.email;
        this.updateUserForm.patchValue({
          role: res.data.role,
        });
      });
    }
  }

  onSubmit() {
    if (this.updateUserForm.invalid || !this.userEmail) return;

    this.admin.updateRole({ email: this.userEmail, newRole: this.updateUserForm.value.role }).subscribe(
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
