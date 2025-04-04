import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from './User';
import { Lesson } from './Lesson';
import { Quiz } from './Quiz';
import { Comment } from './Comment';
import { Review } from './Review';
// import { Category } from './Category';
import { Enrollment } from './Enrollment';

@Entity({name:"Course_tbl47"})
export class Course {
  @PrimaryGeneratedColumn()
  id:number;

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

  // @Column('simple-array',{ nullable: true })
  // tags: string[];

  @CreateDateColumn()
  createdAt:Date;

  @ManyToOne(() =>User,(user)=>user.courses,{ cascade: true })
  creator:User;

  // @ManyToOne(()=> Category,(category)=>category.courses,{ nullable: true })
  // @JoinColumn({ name: "category_id" }) 
  // category:Category;
  
  @OneToMany(()=>Lesson,(lesson)=>lesson.course,{ cascade: true , onDelete: 'CASCADE' })
  lessons:Lesson[];

  @OneToMany(()=>Quiz,(quiz)=>quiz.course,{ cascade: true , onDelete: 'CASCADE' })
  quizzes:Quiz[];

  @OneToMany(()=>Comment,(comment)=>comment.course,{ cascade: true , onDelete: 'CASCADE' })
  comments:Comment[];

  @OneToMany(()=>Review,(review)=>review.course,{ cascade: true , onDelete: 'CASCADE' })
  reviews:Review[];

  @OneToMany(()=>Enrollment,(enrollments)=>enrollments.course,{ cascade: true , onDelete: 'CASCADE' })
  enrollments:Enrollment[];
}