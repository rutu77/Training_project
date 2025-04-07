import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../../models/model';

@Component({
  selector: 'app-question-list',
  standalone: false,
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css'
})
export class QuestionListComponent {
  @Input() questions: Question[] = [];
  @Output() delete = new EventEmitter<number>();
}
