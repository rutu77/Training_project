import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-add-review',
  standalone: false,
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent implements OnInit{

  @Input() courseId!:number
  @Output() reviewAdded= new EventEmitter()

  reviewForm!:FormGroup
  userId= Number(localStorage.getItem('userId'))

  constructor(private homeService:HomeService){}

  ngOnInit():void{
    this.reviewForm= new FormGroup({
      comment:new FormControl(''),
      rating: new FormControl(),
      userId:new FormControl(this.userId),
      courseId:new FormControl(this.courseId)
    })
  }


  onSubmitReview(){
    if(this.reviewForm.valid){
      console.log(this.reviewForm.value);
      
      this.homeService.addReview(this.reviewForm.value).subscribe(
        ()=>{
          Swal.fire({
            title:"Review Submitted",
            text:"Thanks for the review!",
            icon:'success'
          })
          this.reviewAdded.emit()
          this.reviewForm.reset()
        },
        (error:any)=>{
          console.error("Error adding review",error)
          Swal.fire({
            icon:"error",
            title:"Oops...",
            text:error.error.message || "Something went wrong!"
          })
        }

      )
    }
  }
}

