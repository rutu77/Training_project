import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HomeService } from '../../services/home.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-list',
  standalone: false,
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.css'
})
export class QuizListComponent implements OnInit {
  quizzes: any[] = [];
  quizForm: FormGroup;
  userId= Number(localStorage.getItem('userId'))

  constructor(private homeService: HomeService) {
    this.quizForm = new FormGroup({
      title: new FormControl('',[Validators.required]),
      courseId:new FormControl('',[Validators.required]) 
    });
  }

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.homeService.getAllQuizzes().subscribe((data:any) => {
      this.quizzes = data;
      this.quizzes= this.quizzes.filter(quiz=>!quiz.deleted)
    });
  }


  createQuiz(){
    if(this.quizForm.valid){

      this.homeService.createQuiz(this.quizForm.value, this.userId).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Created',
            text: 'Quiz created successfully!',
          })
          this.loadQuizzes()
          this.quizForm.reset()
        },
        (error:any) => {
          console.error('Error creating quiz:', error);
          
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message || 'Failed to create quiz!',
          })
        }
      )}
  }


  deleteQuiz(quizId:number){
    this.homeService.deleteQuiz(quizId).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: 'Quiz deleted successfully!',
        })
        this.loadQuizzes()
      },
      (error:any) => {
        console.error('Error deleting quiz:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete quiz!',
        })
      }
    )}
  }
  