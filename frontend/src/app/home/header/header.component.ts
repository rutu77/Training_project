import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone:false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent{


  constructor(private router: Router) {}

  
  // @ViewChild('courseList') courseList!: ElementRef;

  // scrollToCourseList(): void {
  //   this.courseList.nativeElement.scrollIntoView({ behavior: 'smooth' });
  // }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

}
