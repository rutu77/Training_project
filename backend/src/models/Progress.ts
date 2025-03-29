import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './User';
import { Lesson } from './Lesson';

@Entity({name:'Progress_tbl47'})
export class Progress {
  @PrimaryGeneratedColumn()
  progress_id:number;

  @ManyToOne(()=>User,(user)=>user.progress)
  user: User;

  @ManyToOne(()=>Lesson,(lesson)=>lesson.progress)
  lesson:Lesson;

  @Column({default:false })
  isCompleted: boolean;

  @Column({nullable:true})
  completion:Date
}