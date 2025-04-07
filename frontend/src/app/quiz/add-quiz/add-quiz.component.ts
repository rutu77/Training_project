import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from '../../models/model';
import { HomeService } from '../../services/home.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  standalone: false,
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent{
  courseId!:number;
  quiz!:Quiz;
  answers:string[]=[]

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
