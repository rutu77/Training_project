import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import Swal from 'sweetalert2';
import { Course, Enrollment } from '../../models/model';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-enroll',
  standalone: false,
  templateUrl: './enroll.component.html',
  styleUrl: './enroll.component.css'
})
export class EnrollComponent implements OnInit{

  @Input() course!: Course ;
  userId= Number(localStorage.getItem('userId'));
  enrollments:Enrollment[]=[]

  @Output() enrollSuccess= new EventEmitter<void>();
  @Output() cancel= new EventEmitter<void>();

  constructor(private router: Router,private homeService: HomeService){}

  ngOnInit(): void {
    
  }



  enroll(){
    this.downloadEnrollReceipt()
    this.homeService.enrollCourse(this.userId, this.course.id).subscribe(
      () => {
        Swal.fire({
          title: 'Enrollment Successful',
          text: 'You have been successfully enrolled in the course!',
          icon: 'success',
        });
        this.enrollSuccess.emit();
      },
      (error) => {
        console.error('Error during enrollment', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while enrolling in the course.',
          icon: 'error',
        });
        this.enrollSuccess.emit();
      }
    )
  }

  downloadEnrollReceipt(){
    this.homeService.downloadEnrollmentReciept(+this.userId,this.course.id).subscribe(
      (response:Blob)=>{
        const fileName= `Enrollment_Receipt_${this.userId}.pdf`;
        saveAs(response, fileName);
      },
      (error)=>{
        console.error("Error downloading receipt", error)
      }
    )
  }

  showEnrollSuccess() {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    Toast.fire({
      icon: "success",
      title: "Thanks!!",
      text: "You are successfully enrolled in the course"
    });
  }

  onCancel(){
    this.cancel.emit()
  }
  }
 