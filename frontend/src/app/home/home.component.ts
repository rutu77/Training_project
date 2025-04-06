import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../models/model';
import { HomeService } from '../services/home.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { CourseService } from '../services/course.service';
import { CourseListComponent } from './courselist/courselist.component';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  courses:Course[]=[];
  filteredCourses:Course[]=[]

  @ViewChild(CourseListComponent) courselist!: CourseListComponent;


  constructor(private homeService:HomeService, private courseService:CourseService){}

  
  onSearch(searchQuery: string): void {
    this.courselist.filterCourses(searchQuery);
  }

  // onSearch(searchQuery: string): void {
  //   if(searchQuery.trim()){
  //     this.homeService.searchCourses(searchQuery).subscribe((data:any)=>{
  //       this.courselist.filterCourses=data
  //     })
  //   }
  //   else{
  //     this.courseService.getCourses().subscribe((data:any)=>{
  //       this.courselist.filterCourses= data
  //     })
  //   }
  // }
}


// import { Component, OnInit, ViewChild } from '@angular/core';
// import { Course } from '../models/model';
// import { HomeService } from '../services/home.service';
// import { NavbarComponent } from '../shared/navbar/navbar.component';
// import { CourseService } from '../services/course.service';

// @Component({
//   selector: 'app-home',
//   standalone: false,
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })
// export class HomeComponent{
//   filteredCourses:Course[]=[]


//   constructor(private homeService:HomeService, private courseService:CourseService){}

  
//   onSearchCourse(searchTerm: string): void {
//     if(searchTerm.trim()){
//       this.homeService.searchCourses(searchTerm).subscribe((data:any)=>{
//         this.filteredCourses=data;
//       })
//     }
//     else{
//       this.courseService.getCourses().subscribe((data:any)=>{
//         this.filteredCourses=data
//       })
//     }
//   }
// }

