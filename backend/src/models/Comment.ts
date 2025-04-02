import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Course } from './Course';

@Entity({name:'Comment_tbl47'})
export class Comment {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  message:string;

  @ManyToOne(()=>User,(user)=>user.comments)
  user:User;

  @ManyToOne(()=>Course,(course)=>course.comments)
  @JoinColumn({name:'course_id'})
  course:Course;

  // @ManyToOne(()=>Comment,{ nullable: true, cascade: true  })
  // @JoinColumn({name:'parentComment_id'})
  // parentComment:Comment;

  @ManyToOne(()=>Comment,(comment)=>comment.replies,{ nullable: true, onDelete:"NO ACTION" })
  @JoinColumn({name:'parentComment_id'})
  parentComment:Comment;

  @OneToMany(()=>Comment,(comment)=>comment.parentComment)
  replies:Comment[]
}
