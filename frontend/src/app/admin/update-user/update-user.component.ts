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
  
    updateUserForm!: FormGroup;
  
    constructor(private admin: AdminService) {}
  
    ngOnInit(): void {
      this.updateUserForm = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        role: new FormControl(''),
        // password: new FormControl(''),
        // profilePicture: new FormControl(''),
        // bio: new FormControl(''),
      });
  
      this.loadUserData();
    }
  
    ngOnChanges(): void {
      if (this.userId) {
        this.loadUserData();
      }
    }
  
    loadUserData() {
      this.admin.getUserById(this.userId).subscribe((data: any) => {
        this.updateUserForm.patchValue({
          name: data.name,
          email: data.email,
          role: data.role,
          // password: data.password,
          // profilePicture: data.profilePicture,
          // bio: data.bio
        });
      });
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
  
  
  //   updateUserForm!: FormGroup;
  
  //   constructor(private admin: AdminService, private route: ActivatedRoute) {}
  
  //   ngOnInit(): void {
  //     // this.userId = +this.route.snapshot.paramMap.get('id')!;
  //     this.updateUserForm = new FormGroup({
  //       name: new FormControl(''),
  //       email: new FormControl(''),
  //       role: new FormControl(''),
  //       password: new FormControl(''),
  //       profilePicture: new FormControl(''),
  //       bio: new FormControl(''),
  //     });
  
  //   }
  
  //   loadUserData(userId: number) {

  //       this.admin.getUserById(userId).subscribe((data: any) => {
  //         this.updateUserForm.patchValue({
  //           name: data.name,
  //           email: data.email,
  //           role: data.role,
  //           password: data.password,
  //           profilePicture: data.profilePicture,
  //           bio: data.bio
  //         });
  //       });

  //   }
  
  //   onSubmit() {
  //     if (this.updateUserForm.invalid) return;
  
  //     const updatedUser = {
  //       ...this.updateUserForm.value,
  //     };
  //     const userId= this.updateUserForm.get('id')?.value;
  
  //     this.admin.updateUser(userId, updatedUser).subscribe(
  //       () => {
  //         Swal.fire({
  //           title: 'User Updated',
  //           text: 'The user has been updated successfully!',
  //           icon: 'success',
  //         });
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
  // }
  