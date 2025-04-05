import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
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
  @Output() cancel = new EventEmitter<void>();

  roles: any[] = [];
  updateUserForm!: FormGroup;

  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    this.updateUserForm = new FormGroup({
      role: new FormControl(''),
    });

    this.roles = [
      { label: 'User', value: 'user' },
      { label: 'Teacher', value: 'teacher' },
      { label: 'Admin', value: 'admin' }
    ];

    this.loadUserData();
  }

  loadUserData() {
    if (this.userId) {
      this.admin.getUserById(this.userId).subscribe((data: any) => {
        this.updateUserForm.patchValue({
          role: data.role,
        });
      });
    }
  }

  onSubmit() {
    if (this.updateUserForm.invalid) return;

    const updatedUser = this.getUpdatedValues(this.updateUserForm.value);

    this.admin.updateUser(this.userId, updatedUser).subscribe(
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
      }
    );
  }

  onCancel() {
    this.cancel.emit();
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


//   @Input() userId!:number;
//   @Output() userUpdated = new EventEmitter<void>();
//   @Output() cancel = new EventEmitter<void>();
//   roles: any[] = [];

//   updateUserForm!: FormGroup;

//   constructor(private admin: AdminService) {}

//   ngOnInit(): void {
//     this.updateUserForm = new FormGroup({
//       role: new FormControl(''),
//     });

//     this.roles = [
//       { label: 'User', value: 'user' },
//       { label: 'Teacher', value: 'teacher' },
//       { label: 'Admin', value: 'admin' }
//     ];

//     this.loadUserData();
//   }

//   loadUserData() {
//     console.log(this.userId);
    
//     if (this.userId) {
//       this.admin.getUserById(this.userId).subscribe((data: any) => {
//         this.updateUserForm.patchValue({
//           role: data.role,
//         });
//       });
//     }
//   }

//   onSubmit() {
//     if (this.updateUserForm.invalid) return;

//     const updatedUser = this.getUpdatedValues(this.updateUserForm.value);

//     this.admin.updateUser(this.userId, updatedUser).subscribe(
//       () => {
//         Swal.fire({
//           title: 'User Updated',
//           text: 'The user has been updated successfully!',
//           icon: 'success',
//         });

//         this.userUpdated.emit();
//       },
//       (error: any) => {
//         console.error('Error updating user:', error);
//         Swal.fire({
//           title: 'Error',
//           text: 'An error occurred while updating the user.',
//           icon: 'error',
//         });
//       }
//     );
//   }

//   onCancel() {
//     this.cancel.emit();
//   }

//   private getUpdatedValues(formValues: any): any {
//     const updatedValues: any = {};
//     for (const key in formValues) {
//       if (formValues[key] !== '') {
//         updatedValues[key] = formValues[key];
//       }
//     }
//     return updatedValues;
//   }
// }
