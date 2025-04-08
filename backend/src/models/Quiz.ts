import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Course } from './Course';
import { Question } from './Question';

@Entity({name:'Quiz_tbl47'})
export class Quiz {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title:string

  @ManyToOne(()=>Course,(course)=>course.quizzes, { onDelete: 'CASCADE' })
  @JoinColumn({name:'course_id'})
  course:Course;

  @OneToMany(()=>Question,(question)=>question.quiz,{cascade:true})
  questions:Question[];
}