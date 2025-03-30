import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Course } from './Course';
import { Attempt } from './Attempt';

@Entity({name:'Quiz_tbl47'})
export class Quiz {
  @PrimaryGeneratedColumn()
  quiz_id:number;

  @ManyToOne(()=>Course,(course)=>course.quizzes, { onDelete: 'CASCADE' })
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

  @OneToMany(()=>Attempt,(attempt)=>attempt.quiz,{cascade:true})
  attempts:Attempt[];
}