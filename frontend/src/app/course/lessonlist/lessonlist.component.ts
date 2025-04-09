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
  styleUrl: './lessonlist.component.css',
})
export class LessonlistComponent implements OnInit {
  course: Course | undefined;
  userId = Number(localStorage.getItem('userId'));
  lessons: Lesson[] = [];
  enrollments: Enrollment[] = [];

  displayUpdateDialog = false;
  selectedLessonId!: number;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private homeService: HomeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourse();
    this.loadEnrollments();
    this.loadLessons();
  }

  loadCourse() {
    const courseId = this.route.snapshot.paramMap.get('id');

    if (courseId) {
      this.courseService.getCourseById(+courseId).subscribe((data: any) => {
        this.course = data;
      });
    }
  }

  loadEnrollments() {
    this.homeService.getEnrollments().subscribe((data: any) => {
      this.enrollments = data;
      this.enrollments = this.enrollments.filter(
        (enrollment) => !enrollment.deleted
      );
    });
  }

  loadLessons() {
    this.courseService.getLessons().subscribe((data: any) => {
      this.lessons = data;
      this.lessons = this.lessons
      .filter((lesson) => !lesson.deleted)
      .filter((lesson)=>lesson.course.creator.id===this.userId);

      console.log(this.lessons);
    });
  }

  getLessonByCourseId(courseId: number) {
    const lessonData = this.lessons.filter(
      (lesson) => lesson.course.id === courseId
    );
    return lessonData;
  }

  isEnrolled(courseId: number): boolean {
    const enroll = this.enrollments.some(
      (enrollment) =>
        enrollment.user.id === this.userId && enrollment.course.id === courseId
    );
    return enroll;
  }

  refresh() {
    this.loadLessons();
    this.displayUpdateDialog = false;
  }

  onOpenUpdate(id: number) {
    this.selectedLessonId = id;
    this.displayUpdateDialog = true;
  }

  deleteLesson(lessonId: any) {
    this.courseService.deleteLesson(lessonId).subscribe(
      () => {
        this.loadLessons();
      },
      (error: any) => {
        console.error('Error deleting lesson:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while deleting the lesson.',
          icon: 'error',
        });
      }
    );
  }
}
