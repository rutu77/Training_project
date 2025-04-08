import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-progress',
  standalone: false,
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit{
    userId = Number(localStorage.getItem('userId'));
    report: any;

  constructor(private route: ActivatedRoute, private homeService: HomeService) {}

  ngOnInit(): void {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    this.homeService.getProgressByUser(this.userId).subscribe((data: any) => {
      this.report = data;
      console.log(this.report);
      
    });
  }
}

  //   progressList: any[] = [];
  
  //   constructor(private homeService: HomeService) {}
  
  //   ngOnInit() {
  //     this.homeService.getUserProgress(this.userId).subscribe((data:any) => {
  //       this.progressList = data;
  //     });
  //   }
  // }
  