import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../models/model';
import { HomeService } from '../../services/home.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-take-quiz',
  standalone: false,
  templateUrl: './take-quiz.component.html',
  styleUrl: './take-quiz.component.css'
})
export class TakeQuizComponent implements OnInit {

    quiz: any;
    quizForm: FormGroup;
    userId=Number(localStorage.getItem("userId"))
  
    constructor(private route: ActivatedRoute, private homeService: HomeService, private router:Router) {
      this.quizForm = new FormGroup({});
    }
  
    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      
      this.homeService.getQuizById(id).subscribe((data: any) => {
        this.quiz = data.data;
        this.initializeForm();
        // console.log(data);
      });
    }
  
    initializeForm(): void {
      this.quiz.questions.forEach((question: any) => {
        this.quizForm.addControl(question.id, new FormControl('', Validators.required));
      });
    }

    submitQuiz(): void {
      if (this.quizForm.valid) {
        const answers = this.quizForm.value;
        const userId = this.userId;
        this.homeService.submitQuiz(this.quiz.id, {userId, answers}).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Submitted',
              text: 'Quiz submitted successfully!',
            });
            this.router.navigate([`/home/course/${this.quiz.course.id}`])
          },
          (error: any) => {
            console.error('Error submitting quiz:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error.message|| 'Failed to submit quiz!',
            });
          }
        );
      }
    }
  }
  
