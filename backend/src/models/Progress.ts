import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { User } from './User';
import { Lesson } from './Lesson';
import { Quiz } from './Quiz';

@Entity({name:'Progress_table147'})
export class Progress {

  @PrimaryGeneratedColumn()
  id:number;

  @ManyToOne(()=>User,(user)=>user.progress)
  // @JoinColumn({name:'user_id'})
  user: User;

  @Column({default:false})
  deleted:boolean

  @ManyToOne(()=>Quiz)
  @JoinColumn({name:'quiz_id'})
  quiz:Quiz;

  @Column()
  score: number;

  @Column()
  total:number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  completion: Date;
  
}