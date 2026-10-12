import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { QuizProgressResponse } from '../../models/model';

@Component({
  selector: 'app-chart',
  standalone: false,
  templateUrl: './chart.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './chart.component.css'
})
export class ChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() progress: QuizProgressResponse[] = [];
  private chart?: Highcharts.Chart;
  private viewReady = false;

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.renderChart();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.viewReady) this.renderChart();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private renderChart(): void {
    this.chart?.destroy();
    this.chart = undefined;

    const chartData = this.progress
      .filter(item => !item.deleted && item.quiz !== null)
      .map(item => ({ name: item.quiz.title, y: item.score }));
    if (!chartData.length) return;

    this.chart = Highcharts.chart('container', {
      chart: { type: 'pie' },
      title: { text: 'Quiz scores' },
      tooltip: { valueSuffix: '%' },
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
            style: { fontSize: '1.2em', textOutline: 'none', opacity: 0.7 },
            filter: { operator: '>', property: 'percentage', value: 10 }
          }]
        }
      },
      series: [{
        type: 'pie',
        name: 'Score',
        data: chartData
      }]
    });
  }
}
