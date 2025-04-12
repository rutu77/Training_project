import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/model';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
 
  users: User[] = [];
  displayUpdateDialog= false;
  selectedUserId!:number;

  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.admin.getUsers().subscribe((data: any) => {
      this.users = data;
      this.users= this.users.filter(user=>!user.deleted).filter(user=>user.email!=="admin@gmail.com")
    });
  }

  refresh(){
    this.loadUsers()
    this.displayUpdateDialog=false
  }


  deleteUser(userId: number) {
    this.admin.deleteUser(userId).subscribe(
      () => {
        Swal.fire({
          title: 'User Deleted',
          text: 'The user has been deleted successfully!',
          icon: 'success',
        });
        this.loadUsers();
      },
      (error: any) => {
        console.error('Error deleting user:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while deleting the user.',
          icon: 'error',
        });
      }
    );
  }

  onOpenUpdate(id:number){
    this.selectedUserId=id;
    this.displayUpdateDialog= true
  }
}



// users: User[] = [];
// displayUpdateDialog: boolean = false;
// displayAddDialog: boolean = false;
// selectedUserId!: number;

// constructor(private admin: AdminService) {}

// ngOnInit(): void {
//   this.loadUsers();
// }

// loadUsers() {
//   this.admin.getUsers().subscribe((data: any) => {
//     this.users = data;
//   });
// }

// openUpdateDialog(userId: number) {
//   this.selectedUserId = userId;
//   this.displayUpdateDialog = true;
// }

// openAddDialog() {
//   this.displayAddDialog = true;
// }

// onUserUpdated() {
//   this.loadUsers();
//   this.displayUpdateDialog = false;
// }

// onCancel() {
//   this.displayUpdateDialog = false;
//   this.displayAddDialog = false;
// }

// deleteUser(userId: number) {
//   this.admin.deleteUser(userId).subscribe(
//     () => {
//       Swal.fire({
//         title: 'User Deleted',
//         text: 'The user has been deleted successfully!',
//         icon: 'success',
//       });
//       this.loadUsers();
//     },
//     (error: any) => {
//       console.error('Error deleting user:', error);
//       Swal.fire({
//         title: 'Error',
//         text: 'An error occurred while deleting the user.',
//         icon: 'error',
//       });
//     }
//   );
// }
// }

  
  //   users: User[] = [];
  //   displayUpdateDialog: boolean = false;
  //   selectedUserId!: number;
  //   // selectedUser:User |undefined 
  
  //   constructor(private admin: AdminService) {}
  
    
  //   ngOnInit(): void {
  //     this.loadUsers();
  //   }
  
  //   loadUsers() {
  //     this.admin.getUsers().subscribe((data: any) => {
  //       this.users = data;
  //     });
  //   }
  
  //   openUpdateDialog(userId: number) {
  //     this.selectedUserId= userId;
  //     this.displayUpdateDialog = true
  //   }
  
  //   onUserUpdated() {
  //     this.loadUsers(); 
  //     this.displayUpdateDialog = false; 
  //   }
  
  //   onCancel() {
  //     this.displayUpdateDialog = false; 
  //   }
  
  //   deleteUser(userId: number) {
  //     this.admin.deleteUser(userId).subscribe(
  //       () => {
  //         Swal.fire({
  //           title: 'User Deleted',
  //           text: 'The user has been deleted successfully!',
  //           icon: 'success',
  //         });
  //         this.loadUsers(); 
  //       },
  //       (error: any) => {
  //         console.error('Error deleting user:', error);
  //         Swal.fire({
  //           title: 'Error',
  //           text: 'An error occurred while deleting the user.',
  //           icon: 'error',
  //         });
  //       }
  //     );
  //   }
  // }
  
  
