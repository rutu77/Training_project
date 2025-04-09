import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-progress',
  standalone: false,
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit{
    userId = Number(localStorage.getItem('userId'));
    progressList:any[]=[]

  constructor(private route: ActivatedRoute, private homeService: HomeService) {}

  ngOnInit(): void {
    this.loadProgress()
  }

  loadProgress(){
    this.homeService.getProgressByUser(this.userId).subscribe((data: any) => {
      this.progressList = data.data;
      this.progressList= this.progressList.filter(list=>!list.deleted)
      console.log(data.data);
      
    });
  }

  downloadReport() {
    this.homeService.downloadQuizReport(+this.userId).subscribe(
      (response: Blob) => {
        const fileName = `quiz_progress_report_${this.userId}.pdf`;
        saveAs(response, fileName);
      },
      (error) => {
        console.error('Error downloading the report', error);
      }
    );
  }
}

 