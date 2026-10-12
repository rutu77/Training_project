import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { saveAs } from 'file-saver';
import { QuizProgressResponse } from '../../models/model';
import { AuthSessionService } from '../../services/auth-session.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-progress',
  standalone: false,
  templateUrl: './progress.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit {
  userId: number | null;
  progressList: QuizProgressResponse[] = [];
  isLoading = true;
  isDownloading = false;
  loadError = '';
  reportError = '';

  constructor(
    private homeService: HomeService,
    private session: AuthSessionService,
    private readonly changeDetector: ChangeDetectorRef
  ) {
    this.userId = this.session.getUserId();
  }

  ngOnInit(): void {
    this.loadProgress();
  }

  loadProgress(): void {
    const userId = this.userId;
    if (userId === null) {
      this.progressList = [];
      this.isLoading = false;
      this.changeDetector.markForCheck();
      return;
    }

    this.isLoading = true;
    this.loadError = '';
    this.homeService.getProgressByUser(userId).subscribe({
      next: (response) => {
        this.progressList = response.data.filter((progress) => !progress.deleted);
        this.isLoading = false;
        this.changeDetector.markForCheck();
      },
      error: (error: unknown) => {
        console.error('Unable to load quiz progress:', error);
        this.loadError = 'Quiz progress could not be loaded. Please try again.';
        this.progressList = [];
        this.isLoading = false;
        this.changeDetector.markForCheck();
      }
    });
  }

  downloadReport(): void {
    const userId = this.userId;
    if (userId === null || this.progressList.length === 0 || this.isDownloading) return;

    this.isDownloading = true;
    this.reportError = '';
    this.homeService.downloadQuizReport(userId).subscribe({
      next: (response) => {
        saveAs(response, `quiz_progress_report_${userId}.pdf`);
        this.isDownloading = false;
        this.changeDetector.markForCheck();
      },
      error: (error: unknown) => {
        console.error('Error downloading the report:', error);
        this.reportError = 'The report could not be downloaded. Please try again.';
        this.isDownloading = false;
        this.changeDetector.markForCheck();
      }
    });
  }
}
