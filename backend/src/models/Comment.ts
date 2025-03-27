import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Course } from './Course';

@Entity({name:'Comment_tbl47'})
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id:number;

  @Column()
  message:string;

  @ManyToOne(()=>User,(user)=>user.comments)
  user:User;

  @ManyToOne(()=>Course,(course)=>course.comments)
  course:Course;

  @ManyToOne(()=>Comment,{ nullable: true })
  parentComment:Comment;
}