import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HomeService } from '../../services/home.service';
import { Progress } from '../../models/model';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-chart',
  standalone: false,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})

export class ChartComponent implements AfterViewInit, OnDestroy {

  userId= Number(localStorage.getItem("userId"))
  constructor(private homeService: HomeService) {}

  // Highcharts instance
  Highcharts: typeof Highcharts = Highcharts;

  // Track subscriptions for cleanup
  private subscriptions: Subscription[] = [];

  ngAfterViewInit(): void {
    this.loadProgressByUser();
  }

  ngOnDestroy(): void {
    // to prevent memory leaks
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadProgressByUser() {
    const subscription = this.homeService.getProgressByUser(this.userId)
      .pipe(map((res:any) => res.data))
      .subscribe({
        next: (data) => {
          const chartData = data.map((item: any) => ({
            name: item.quiz.title, 
            y: item.score
          }));

          this.buildChart(chartData);
        },
        error: (err) => {
          console.error('Error fetching progress data', err);
        }
      });

    this.subscriptions.push(subscription);
  }

  buildChart(chartData: any[]) {
    Highcharts.chart('container', {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Quiz Scores'
      },
      tooltip: {
        valueSuffix: '%'
      },
      subtitle: {
        text: ''
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
            enabled: true,
            distance: 20
          }, {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10
            }
          }]
        }
      },
      series: [{
        type: 'pie', 
        name: 'Score',
        colorByPoint: true,
        data: chartData
      } as Highcharts.SeriesPieOptions] 
    });
  }
  
}  