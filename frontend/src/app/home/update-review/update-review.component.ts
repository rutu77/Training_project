import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Review } from '../../models/model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../../services/home.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-review',
  standalone: false,
  templateUrl: './update-review.component.html',
  styleUrl: './update-review.component.css'
})
export class UpdateReviewComponent{

  @Input() review!: Review;
  @Output() reviewUpdated = new EventEmitter<void>();

  userId= Number(localStorage.getItem("userId"));

  reviewEditForm = new FormGroup({
    rating: new FormControl(),
    comment: new FormControl(''),
  });

  constructor(private homeService: HomeService) {}

  ngOnChanges() {
    if (this.review) {
      this.reviewEditForm.patchValue({
        rating: this.review.rating,
        comment: this.review.comment,
      });
    }
  }

  updateReview() {
    if (this.reviewEditForm.valid){
      const reviewData = {
        rating: this.reviewEditForm.value.rating,
        comment: this.reviewEditForm.value.comment?? '',
      };

      this.homeService.updateReview(this.review.id, reviewData).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Updated',
            text: 'Review updated successfully!',
          });
          this.reviewUpdated.emit();
        },
        (error: any) => {
          console.error('Error updating review:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update review!',
          });
        }
      );
    }
  }
}
  