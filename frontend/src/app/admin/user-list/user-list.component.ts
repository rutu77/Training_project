import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../models/model';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
 
  users: User[] = [];
  teacherRequests: User[] = [];
  displayUpdateDialog= false;
  selectedUserId!:number;
  isLoading:boolean=true
  loadError = '';

  constructor(
    private admin: AdminService,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadTeacherRequests();
  }

  loadTeacherRequests() {
    this.admin.getTeacherRequests().subscribe({
      next: (response) => {
        this.teacherRequests = response.data;
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error('Error loading teacher requests:', error);
        Swal.fire({
          title: 'Error',
          text: 'Unable to load teacher access requests.',
          icon: 'error',
        });
        this.changeDetector.detectChanges();
      }
    });
  }

  loadUsers(): void {
    this.isLoading = true;
    this.loadError = '';
    this.admin.getUsers().subscribe({
      next: (data) => {
        this.users = data.filter(user => !user.deleted && user.email !== 'admin@gmail.com');
        this.isLoading = false;
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.users = [];
        this.loadError = 'Users could not be loaded. Please try again.';
        this.isLoading = false;
        this.changeDetector.detectChanges();
      }
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
