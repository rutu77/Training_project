import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Quiz } from './Quiz';
import { User } from './User';

@Entity({name:"Question_tbl47"})
export class Question {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  question:string;

  @Column('simple-array')
  options: string[];

  @Column()
  correctAnswer:string;

  @Column({nullable:true})
  explanation:string;

  @ManyToOne(() => Quiz,(quiz)=>quiz.questions)
  @JoinColumn({name:'quiz_id'})
  quiz:Quiz;
}