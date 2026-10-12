import { ChangeDetectorRef, Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ManagedEnrollment } from '../../models/model';
import { HomeService } from '../../services/home.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-enrollments',
  standalone: false,
  templateUrl: './user-enrollments.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './user-enrollments.component.css'
})
export class UserEnrollmentsComponent {
  enrollments: ManagedEnrollment[] = [];
  filterEnrolls: ManagedEnrollment[] = [];
  searchText = '';
  isLoading = true;
  loadError = '';

  constructor(
    private homeService: HomeService,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEnrollments()
  }

  loadEnrollments(): void {
    this.isLoading = true;
    this.loadError = '';
    this.homeService.getManageEnrollments().subscribe({
      next: (data) => {
        this.enrollments = data.filter(enroll => !enroll.deleted);
        this.isLoading = false;
        this.filterEnrolls = [...this.enrollments];
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching managed enrollments:', error);
        this.isLoading = false;
        this.enrollments = [];
        this.filterEnrolls = [];
        this.loadError = error instanceof HttpErrorResponse && error.status === 0
          ? `The API at ${environment.apiUrl} could not be reached. Check that the backend is running, then try again.`
          : 'Enrollments could not be loaded. Check your access and try again.';
        this.changeDetector.detectChanges();
      }
    })
  }

  filterEnrollments(): void {
    this.filterEnrolls = this.enrollments.filter(enroll =>
      (enroll.user?.name ?? '').toLowerCase().includes(this.searchText.toLowerCase()) ||
      (enroll.course?.title ?? '').toLowerCase().includes(this.searchText.toLowerCase()) ||
      enroll.user?.id.toString().includes(this.searchText.toLowerCase())
    );
    this.changeDetector.detectChanges();
  }

}
