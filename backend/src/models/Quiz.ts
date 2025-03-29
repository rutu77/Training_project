import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Course } from './Course';

@Entity({name:'Quiz_tbl47'})
export class Quiz {
  @PrimaryGeneratedColumn()
  quiz_id:number;

  @ManyToOne(()=>Course,(course)=>course.quizzes)
  course:Course;

  @Column()
  question:string;

  @Column('simple-array')
  options: string[];

  @Column()
  correctAnswer:string;

  @Column({nullable:true})
  explanation:string;

  @Column({nullable:true})
  timeLimit: number;
}