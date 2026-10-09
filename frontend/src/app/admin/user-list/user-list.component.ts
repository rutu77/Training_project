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
  teacherRequests: User[] = [];
  displayUpdateDialog= false;
  selectedUserId!:number;
  isLoading:boolean=true

  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadTeacherRequests();
  }

  loadTeacherRequests() {
    this.admin.getTeacherRequests().subscribe({
      next: (response) => this.teacherRequests = response.data,
      error: (error) => {
        console.error('Error loading teacher requests:', error);
        Swal.fire({
          title: 'Error',
          text: 'Unable to load teacher access requests.',
          icon: 'error',
        });
      }
    });
  }

  loadUsers() {
    this.admin.getUsers().subscribe((data: any) => {
      this.users = data;
      this.users= this.users.filter(user=>!user.deleted).filter(user=>user.email!=="admin@gmail.com")
      this.isLoading=false
    });
  }

  refresh(){
    this.loadUsers()
    this.loadTeacherRequests()
    this.displayUpdateDialog=false
  }

  reviewTeacherRequest(userId: number, decision: 'approved' | 'rejected') {
    this.admin.reviewTeacherRequest(userId, decision).subscribe({
      next: () => {
        Swal.fire({
          title: decision === 'approved' ? 'Teacher access approved' : 'Request rejected',
          icon: 'success',
        });
        this.loadTeacherRequests();
        this.loadUsers();
      },
      error: (error: any) => {
        console.error('Error reviewing teacher request:', error);
        Swal.fire({
          title: 'Error',
          text: error.error?.message || 'Unable to review teacher request.',
          icon: 'error',
        });
      }
    });
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

