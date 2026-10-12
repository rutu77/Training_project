import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Course, Enrollment } from '../../models/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-learnings',
  standalone: false,
  templateUrl: './my-learnings.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './my-learnings.component.css',
})
export class MyLearningsComponent implements OnInit {
  courses: Course[] = [];
  enrollments: Enrollment[] = [];
  isLoading = true;
  loadError = '';

  constructor(
    private homeservice: HomeService,
    private router: Router,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEnrollments();
  }

  loadEnrollments(): void {
    this.isLoading = true;
    this.loadError = '';
    this.homeservice.getEnrollments().subscribe({
      next: (data: Enrollment[]) => {
        this.enrollments = data.filter(
          (enrollment) => !enrollment.deleted && !enrollment.course.deleted
        );
        this.courses = Array.from(
          new Map(this.enrollments.map((enrollment) => [enrollment.course.id, enrollment.course])).values()
        );
        this.isLoading = false;
        this.changeDetector.markForCheck();
      },
      error: (error: unknown) => {
        console.error('Error loading enrolled courses:', error);
        this.loadError = 'Your enrolled courses could not be loaded. Please try again.';
        this.isLoading = false;
        this.changeDetector.markForCheck();
      }
    });
  }

  viewCourse(courseId: number): void {
    this.router.navigate([`home/course/${courseId}`]);
    // console.log(courseId);
  }
}
