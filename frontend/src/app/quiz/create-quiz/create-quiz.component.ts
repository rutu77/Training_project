import { Component, EventEmitter, Output } from '@angular/core';
import { HomeService } from '../../services/home.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-quiz',
  standalone: false,
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css'
})
export class CreateQuizComponent {
  courseId!:number;
  @Output() quizCreated= new EventEmitter<void>()

  constructor(private homeService:HomeService){}

  createQuiz(){
    this.homeService.createQuiz(this.courseId).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Created',
          text: 'Quiz created successfully!',
        })
      },
      (error:any) => {
        console.error('Error creating quiz:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to create quiz!',
        })
      }
    )}
}
