import { ChangeDetectorRef, Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Course, Enrollment, Review } from '../../models/model';
import { HomeService } from '../../services/home.service';
import { CourseService } from '../../services/course.service';
import { AuthSessionService } from '../../services/auth-session.service';
import { EMPTY, Subject, catchError, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-courselist',
  standalone: false,
  templateUrl: './courselist.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './courselist.component.css'
})


export class CourseListComponent implements OnInit, OnDestroy {
 
  enrollments: Enrollment[] = [];
  
  get userId(): number | null {
    return this.session.getUserId();
  }
  reviews: Review[]=[];
  ratings: { [key: number]: number } = {};
  courses: Course[] = [];
  filteredCourses:Course[]=[]
  isLoading = true;
  loadError = '';
  currentSearch = '';
  currentPage = 1;
  pageSize = 20;
  totalCourses = 0;
  totalPages = 0;
  private readonly pageRequests = new Subject<{ search: string; page: number }>();
  private readonly destroy$ = new Subject<void>();


  constructor(
    private homeService: HomeService,
    private router: Router,
    private courseService: CourseService,
    private session: AuthSessionService,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {   
    this.loadReviews()
    this.loadEnrollments()

    this.courseService.query$.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    ).subscribe(search => {
      this.currentSearch = search.trim();
      this.currentPage = 1;
      this.pageRequests.next({ search: this.currentSearch, page: this.currentPage });
    });

    this.pageRequests.pipe(
      switchMap(request => {
        this.isLoading = true;
        this.loadError = '';
        this.changeDetector.markForCheck();
        return this.courseService.getCourses(request.search, request.page, this.pageSize);
      }),
      catchError((error: unknown) => {
        console.error('Error loading course catalog:', error);
        this.courses = [];
        this.filteredCourses = [];
        this.totalCourses = 0;
        this.totalPages = 0;
        this.isLoading = false;
        this.loadError = 'Courses could not be loaded. Please try again.';
        this.changeDetector.markForCheck();
        return EMPTY;
      }),
      takeUntil(this.destroy$),
    ).subscribe({
      next: response => {
        this.courses = response.data;
        this.filteredCourses = response.data;
        this.currentPage = response.pagination.page;
        this.totalCourses = response.pagination.total;
        this.totalPages = response.pagination.totalPages;
        this.isLoading = false;
        this.calculateMeanRatings();
        this.changeDetector.markForCheck();
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.pageRequests.complete();
  }

  loadPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.pageRequests.next({ search: this.currentSearch, page });
  }

  retryLoad(): void {
    this.pageRequests.next({ search: this.currentSearch, page: this.currentPage });
  }

  loadReviews(){
    this.homeService.getReviews().subscribe(data => {
      this.reviews = data.filter(review => !review.deleted);
      this.calculateMeanRatings();
      this.changeDetector.markForCheck();
    }, () => {
      this.reviews = [];
      this.calculateMeanRatings();
      this.changeDetector.markForCheck();
    });
  }

  loadEnrollments(){
    if (!this.session.isLoggedIn()) {
      this.enrollments = [];
      return;
    }

    this.homeService.getEnrollments().subscribe({
      next: data => {
        this.enrollments = data.filter(enrollment => !enrollment.deleted);
        this.changeDetector.markForCheck();
      },
      error: error => {
        console.error('Error fetching enrollments', error);
        this.changeDetector.markForCheck();
      },
    });
  }



  //get average ratings
  calculateMeanRatings(): void {
    this.courses.forEach(course => {
      const courseReviews = this.reviews.filter(review => review.course.id === course.id);
      if (courseReviews.length > 0) {
        const totalRating = courseReviews.reduce((sum, review) => sum + review.rating, 0);
        this.ratings[course.id] = totalRating / courseReviews.length;
      } else {
        this.ratings[course.id] = 0; 
      }
    });
  }
  

  viewCourse(courseId: number): void {
    this.router.navigate([`home/course/${courseId}`]);
  }
  

  // enroll(): void {
  //   this.router.navigate(['home/enrollment']);
  // }

  isEnrolled(courseId: number): boolean {
    const userId = this.userId;
    if (userId === null) return false;
    const enroll = this.enrollments.some(enrollment => enrollment.user.id === userId && enrollment.course.id === courseId);
    return enroll;
  }


}