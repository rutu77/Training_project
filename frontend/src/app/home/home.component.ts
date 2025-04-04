import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../models/model';
import { HomeService } from '../services/home.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  courses:Course[]=[];
  filteredCourses:Course[]=[]

  @ViewChild(NavbarComponent) navbarComponent!: NavbarComponent;


  constructor(private homeService:HomeService, private courseService:CourseService){}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data:any)=>{
      this.courses=data;
      
      this.filteredCourses=data;
    })
  }

  // onFilterChange(tag: string): void {
  //   this.filteredCourses = this.courses.filter(course => course.tags?.includes(tag));
  //   console.log("Filtered courses...........................................:", this.filteredCourses); 
  //   // console.log("tag.......:", tag);
  // }
  
  
  onSearch(searchQuery: string): void {
    // console.log("query.....", searchQuery);
    const query = searchQuery.toLowerCase();
    this.filteredCourses = this.courses.filter(course =>
      course.title.toLowerCase().includes(query) 
      ||course.description.toLowerCase().includes(query)
    );
  }
}

