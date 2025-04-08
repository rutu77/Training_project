import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { User } from './User';
import { Lesson } from './Lesson';
import { Quiz } from './Quiz';

@Entity({name:'Progress_tbl74'})
export class Progress {

  @PrimaryGeneratedColumn()
  id:number;

  @ManyToOne(()=>User,(user)=>user.progress)
  // @JoinColumn({name:'user_id'})
  user: User;

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
//   @PrimaryGeneratedColumn()
//   id:number;

//   @ManyToOne(()=>User,(user)=>user.progress)
//   user: User;

//   @ManyToOne(()=>Lesson,(lesson)=>lesson.progress)
//   @JoinColumn({name:'lesson_id'})
//   lesson:Lesson;

//   @Column({default:false })
//   isCompleted: boolean;

//   @Column({nullable:true})
//   completion:Date
// }