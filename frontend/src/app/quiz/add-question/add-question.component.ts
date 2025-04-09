import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../services/home.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  standalone: false,
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit{

    quiz: any;
    questionForm: FormGroup;
  
    constructor(private route: ActivatedRoute, private homeService: HomeService) {
      this.questionForm = new FormGroup({
        question: new FormControl('', [Validators.required]),
        options: new FormControl('', [Validators.required]),
        correctAnswer: new FormControl('', [Validators.required]),
        explanation: new FormControl('')
      });
    }
  
    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.homeService.getQuizById(id).subscribe((data:any) => {
        this.quiz = data.data;
        // console.log("add questions",data);
        
        if (!this.quiz.questions) {
          this.quiz.questions = [];
        }
      });
    }
  
    addQuestion(): void {
      if (this.questionForm.valid) {
        const questionData = {
          ...this.questionForm.value,
          options: this.questionForm.value.options.split(',')
        };
        this.homeService.addQuestiontoQuiz(this.quiz.id, questionData).subscribe(
          data => {
            this.quiz.questions.push(data);
            this.questionForm.reset();
            Swal.fire({
              icon: 'success',
              title: 'Added',
              text: 'Question added successfully!',
            });
          },
          error => {
            console.error('Error adding question:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to add question!',
            });
          }
        );
      }
    }
  
    // updateQuestion(question: any): void {
    //   this.homeService.updateQuestion(question.id, question).subscribe(
    //     data => {
    //       const index = this.quiz.questions.findIndex((q: any) => q.id === question.id);
    //       this.quiz.questions[index] = data;
    //       Swal.fire({
    //         icon: 'success',
    //         title: 'Updated',
    //         text: 'Question updated successfully!',
    //       });
    //     },
    //     error => {
    //       console.error('Error updating question:', error);
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Error',
    //         text: 'Failed to update question!',
    //       });
    //     }
    //   );
    // }
  
    deleteQuestion(questionId: number): void {
      this.homeService.deleteQuestion(questionId).subscribe(
        () => {
          this.quiz.questions = this.quiz.questions.filter((q: any) => q.id !== questionId);
          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: 'Question deleted successfully!',
          });
        },
        error => {
          console.error('Error deleting question:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete question!',
          });
        }
      );
    }
  }
  