import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Lesson } from './Lesson';
import { Quiz } from './Quiz';
import { Comment } from './Comment';
import { Review } from './Review';
import { Category } from './Category';
import { Enrollment } from './Enrollment';

@Entity({name:"Course_tbl47"})
export class Course {
  @PrimaryGeneratedColumn()
  course_id:number;

  @Column()
  title:string;

  @Column()
  description:string;

  @Column({default:false})
  isPublished:boolean;

  @Column({nullable:true})
  thumbnail:string;

  @Column({nullable:true})
  level: 'beginner' | 'intermediate' | 'advanced';

  @Column({nullable:true})
  duration: number;

  @Column({type: 'decimal',default: 0})
  price: number;

  @Column('simple-array',{ nullable: true })
  tags: string[];

  @CreateDateColumn()
  createdAt:Date;

  @ManyToOne(() =>User,(user)=>user.courses)
  creator:User;

  @ManyToOne(()=> Category,(category)=>category.courses,{ nullable: true })
  category:Category;

  @OneToMany(()=>Lesson,(lesson)=>lesson.course)
  lessons:Lesson[];

  @OneToMany(()=>Quiz,(quiz)=>quiz.course)
  quizzes:Quiz[];

  @OneToMany(()=>Comment,(comment)=>comment.course)
  comments:Comment[];

  @OneToMany(()=>Review,(review)=>review.course)
  reviews:Review[];

  @OneToMany(()=>Enrollment,(enrollments)=>enrollments.course)
  enrollments:Enrollment[];
}