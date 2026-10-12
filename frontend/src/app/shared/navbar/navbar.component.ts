import { ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { debounceTime, filter, Subject, takeUntil } from 'rxjs';
import { CourseService } from '../../services/course.service';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnDestroy {
  isLoggedIn:boolean=false;
  dropdownOpen = false;
  profileDropdownOpen:boolean = false;
  userDropdownOpen=false;
  courseDropdownOpen = false;
  isTeacher:boolean=false;
  isAdmin:boolean=false;


  searchValue:string=''
  @Output() search= new EventEmitter<string>();
  private searchSubject= new Subject<string>();
  private readonly destroy$ = new Subject<void>();


  constructor(
    private _auth:AuthService,
    private route:Router,
    private courseService:CourseService,
    private elementRef: ElementRef<HTMLElement>,
    private readonly changeDetector: ChangeDetectorRef
  ){
    this._auth.$authState.pipe(takeUntil(this.destroy$)).subscribe(status => {
      const wasLoggedIn = this.isLoggedIn;
      this.isLoggedIn = status;
      if (!status) {
        this.closeDropdowns();
        if (wasLoggedIn) void this.route.navigate(['/auth/login']);
      }
      this.changeDetector.markForCheck();
    });
    this._auth.$role.pipe(takeUntil(this.destroy$)).subscribe(role => {
      this.isTeacher = role === 'teacher';
      this.isAdmin = role === 'admin';
      if (!role) this.closeDropdowns();
      this.changeDetector.markForCheck();
    });
    this.searchSubject.pipe(debounceTime(350), takeUntil(this.destroy$))
      .subscribe(query => this.courseService.emitSearch(query));
    this.route.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.closeDropdowns();
      this.changeDetector.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.searchSubject.complete();
  }


  //search
  searchCourses(value: string) {
    this.searchSubject.next(value)
  }

  //dropdowns
  toggleProfileDropdown() {
    this.profileDropdownOpen = !this.profileDropdownOpen;
    this.courseDropdownOpen = false;
    this.userDropdownOpen = false;
  }

  toggleCourseDropdown() {
    this.courseDropdownOpen = !this.courseDropdownOpen;
    this.profileDropdownOpen = false;
    this.userDropdownOpen = false;
  }

  toggleUserDropdown(){
    this.userDropdownOpen= !this.userDropdownOpen;
    this.profileDropdownOpen = false;
    this.courseDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeWhenClickingOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closeDropdowns();
    }
  }

  private closeDropdowns(): void {
    this.profileDropdownOpen = false;
    this.courseDropdownOpen = false;
    this.userDropdownOpen = false;
  }



  //logout
  logout(){
      this._auth.logout()
      this.showLogoutSuccess()
      this.route.navigate(['/auth/login'])
  }

  showLogoutSuccess() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Logout successfully'
    })
  }
}