import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { Course, Enrollment } from '../../models/model';
import { saveAs } from 'file-saver';
import { NotificationService } from '../../services/notification.service';
import { AuthSessionService } from '../../services/auth-session.service';

@Component({
  selector: 'app-enroll',
  standalone: false,
  templateUrl: './enroll.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './enroll.component.css'
})
export class EnrollComponent{

  @Input() course!: Course ;
  userId: number | null;
  enrollments:Enrollment[]=[]
  isEnrolling = false;

  @Output() enrollSuccess= new EventEmitter<void>();
  @Output() cancel= new EventEmitter<void>();

  constructor(
    private router: Router,
    private homeService: HomeService,
    private notifications: NotificationService,
    private session: AuthSessionService
  ){
    this.userId = this.session.getUserId();
  }


  enroll(){
    if (this.isEnrolling) return;
    this.isEnrolling = true;
    this.homeService.enrollCourse(this.course.id).subscribe({
      next: () => {
        this.isEnrolling = false;
        this.notifications.success('You have been successfully enrolled in the course!');
        this.downloadEnrollReceipt();
        this.enrollSuccess.emit();
      },
      error: (error: any) => {
        this.isEnrolling = false;
        console.error('Error during enrollment', error);
        this.notifications.error(error.error?.message || 'An error occurred while enrolling in the course.');
      }
    })
  }

  downloadEnrollReceipt(){
    this.homeService.downloadEnrollmentReciept(this.course.id).subscribe(
      (response:Blob)=>{
        const fileName = this.userId === null
          ? 'Enrollment_Receipt.pdf'
          : `Enrollment_Receipt_${this.userId}.pdf`;
        saveAs(response, fileName);
      },
      (error)=>{
        console.error("Error downloading receipt", error)
        this.notifications.error('Enrollment succeeded, but the receipt could not be downloaded.');
      }
    )
  }

  onCancel(){
    this.cancel.emit()
  }
  }
 