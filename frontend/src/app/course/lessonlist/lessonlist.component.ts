import { Component, OnInit } from '@angular/core';
import { Course, Enrollment, Lesson } from '../../models/model';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lessonlist',
  standalone: false,
  templateUrl: './lessonlist.component.html',
  styleUrl: './lessonlist.component.css'
})
export class LessonlistComponent implements OnInit{

  course: Course | undefined;
  userId= Number(localStorage.getItem('userId'))
  lessons: Lesson[]=[]
  enrollments:Enrollment[]=[]

  displayUpdateDialog: boolean = false;
  selectedLessonId!: number;
  // selectedLesson: Lesson | undefined

  displayAddDialog: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private courseService:CourseService,
    private homeService:HomeService,
    private router: Router
  ) {}
  
  
  ngOnInit():void{
    this.loadCourse()
    this.loadEnrollments()
    this.loadLessons()
  }

  loadCourse(){
    const courseId = this.route.snapshot.paramMap.get('id');

    if (courseId) {
      this.courseService.getCourseById(+courseId).subscribe((data:any) => {
        this.course = data;   
      });
    }
  }

  loadEnrollments(){
    this.homeService.getEnrollments().subscribe((data:any) => {
      this.enrollments = data;
    });
  }

  loadLessons(){
    this.courseService.getLessons().subscribe((data:any)=>{
      this.lessons= data
    })
  }


  updateCourse(courseId: number): void {
    this.router.navigate([`home/updateCourse/${courseId}`]);  
  }

  getLessonByCourseId(courseId:number){
    const lessonData= this.lessons.filter(lesson=>lesson.courseId===courseId)
    return lessonData
  }

  isEnrolled(courseId: number): boolean {
    const enroll = this.enrollments.some(enrollment => enrollment.user.id === this.userId && enrollment.course.id === courseId);
    return enroll;
  }



  //Update Communication
  openUpdateDialog(lessonId:number){
    this.selectedLessonId= lessonId;
    this.displayUpdateDialog= true;
  }

  onLessonUpdated(){
    this.loadLessons();
    this.displayUpdateDialog=false;
  }

  //Add Communication
  openAddDialog(){
    this.displayAddDialog= true;
  }

  onLessonAdded(){
    this.loadLessons();
    this.displayAddDialog= false;
  }

  onCancel(){
    this.displayUpdateDialog=false
    this.displayAddDialog= false
  }


  deleteLesson(lessonId:any){
    this.courseService.deleteLesson(lessonId).subscribe(
      ()=>{
        Swal.fire({
          title: 'Lesson Deleted',
          text: 'The lesson has been deleted successfully!',
          icon: 'success',
        });
        this.loadLessons(); 
      },
      (error:any)=>{
        console.error('Error deleting lesson:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while deleting the lesson.',
          icon: 'error',
        });
      }
    )
  }

  
}
  