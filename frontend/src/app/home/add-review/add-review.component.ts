import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-add-review',
  standalone: false,
  templateUrl: './add-review.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent implements OnInit{

  @Input() courseId!:number
  @Output() reviewAdded= new EventEmitter()

  reviewForm!:FormGroup
  constructor(private homeService:HomeService){}

  ngOnInit():void{
    this.reviewForm= new FormGroup({
      comment:new FormControl(''),
      rating: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)])
    })
  }


  onSubmitReview(){
    if(this.reviewForm.valid){
      this.homeService.addReview({
        ...this.reviewForm.value,
        courseId: this.courseId
      }).subscribe(
        ()=>{
          Swal.fire({
            title:"Review Submitted",
            text:"Thanks for the review!",
            icon:'success'
          })
          this.reviewAdded.emit()
          this.reviewForm.reset({ comment: '', rating: null })
        },
        (error:any)=>{
          console.error("Error adding review",error)
          Swal.fire({
            icon:"error",
            title:"Oops...",
            text:error.error.message || "Something went wrong!"
          })
          this.reviewAdded.emit()
        }

      )
    }
  }
}
