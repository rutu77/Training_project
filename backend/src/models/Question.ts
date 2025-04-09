import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Quiz } from './Quiz';
import { User } from './User';

@Entity({name:"Question_table147"})
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

  @Column({default:false})
  deleted:boolean

  @ManyToOne(() => Quiz,(quiz)=>quiz.questions, {onDelete: 'CASCADE' })
  @JoinColumn({name:'quiz_id'})
  quiz:Quiz;
}