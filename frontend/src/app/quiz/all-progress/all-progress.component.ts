import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Progress } from '../../models/model';

@Component({
  selector: 'app-all-progress',
  standalone: false,
  templateUrl: './all-progress.component.html',
  styleUrl: './all-progress.component.css'
})
export class AllProgressComponent implements OnInit{
  progresses:Progress[]=[]

  constructor(private homeService:HomeService){}

  ngOnInit(): void {
    this.loadProgresses()
  }

  loadProgresses(){
    this.homeService.getAllProgress().subscribe((data:any)=>{
      this.progresses= data
    })
  }

}
