import { ChangeDetectorRef, Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HomeService } from '../../services/home.service';
import { ProgressRecord } from '../../models/model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-all-progress',
  standalone: false,
  templateUrl: './all-progress.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './all-progress.component.css'
})
export class AllProgressComponent implements OnInit{
  progresses:ProgressRecord[]=[]
  filteredProgress:ProgressRecord[]=[]
  searchText:string=''
  isLoading:boolean=true
  loadError = '';

  constructor(
    private homeService: HomeService,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProgresses()
  }

  loadProgresses(): void {
    this.isLoading = true;
    this.loadError = '';
    this.homeService.getManageProgress().subscribe({
      next: (data) => {
        this.progresses = data.filter(progress => !progress.deleted);
        this.isLoading = false;
        this.filteredProgress = [...this.progresses];
        this.changeDetector.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching managed progress:', error);
        this.isLoading = false;
        this.progresses = [];
        this.filteredProgress = [];
        this.loadError = error instanceof HttpErrorResponse && error.status === 0
          ? `The API at ${environment.apiUrl} could not be reached. Check that the backend is running, then try again.`
          : 'Learner progress could not be loaded. Check your access and try again.';
        this.changeDetector.markForCheck();
      }
    })
  }

  filterProgress(): void {
    const query = this.searchText.toLowerCase();
    this.filteredProgress = this.progresses.filter(progress =>
      progress.id.toString().includes(query) ||
      (progress.user?.name ?? '').toLowerCase().includes(query) ||
      progress.score.toString().includes(query) ||
      (progress.quiz?.title ?? '').toLowerCase().includes(query)
    );
    this.changeDetector.markForCheck();
  }

}
