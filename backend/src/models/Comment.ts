import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Course } from './Course';

@Entity({name:'Comment_table147'})
export class Comment {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  message:string;

  @Column({default:false})
  deleted:boolean

  @ManyToOne(()=>User,(user)=>user.comments)
  user:User;

  @ManyToOne(()=>Course,(course)=>course.comments)
  @JoinColumn({name:'course_id'})
  course:Course;
}
