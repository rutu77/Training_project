import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-progress',
  standalone: false,
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit{
    userId = Number(localStorage.getItem('userId'));
    progressList: any[] = [];
  
    constructor(private homeService: HomeService) {}
  
    ngOnInit() {
      this.homeService.getUserProgress(this.userId).subscribe((data:any) => {
        this.progressList = data;
      });
    }
  }
  