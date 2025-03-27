import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './User';
import { Quiz } from './Quiz';

@Entity({name:"Attempt_tbl47"})
export class Attempt {
  @PrimaryGeneratedColumn()
  attempt_id:number;

  @ManyToOne(() => User,(user)=>user.attempts)
  user:User;

  @ManyToOne(() => Quiz)
  quiz:Quiz;

  @Column()
  selectedAnswer:string;

  @Column()
  isCorrect:boolean;
}