import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { ChartType } from 'chart.js';



@Component({
  selector: 'app-progress-chart',
  standalone: false,
  templateUrl: './progress-chart.component.html',
  styleUrl: './progress-chart.component.css'
})
export class ProgressChartComponent  implements OnInit {
    chartLabels: string[] = [];
    chartData: number[] = [];
    chartType: ChartType = 'bar';
    chartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    };
  
    constructor(private homeService: HomeService) {}
  
    ngOnInit(): void {
      const userId = Number(localStorage.getItem('userId'));
      this.homeService.getProgressByUser(userId).subscribe((progressList: any) => {
        // For each progress record, get the quiz title and percentage score
        this.chartLabels = progressList.map((p: any) => p.quiz.title);
        this.chartData = progressList.map((p: any) =>
          Math.round((p.score / p.total) * 100)
        );
      });
    }
  }