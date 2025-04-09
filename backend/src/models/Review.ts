import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Course } from './Course';


@Entity({name:'Review_table147'})
export class Review {
  @PrimaryGeneratedColumn()
  id:number;

  @ManyToOne(()=>User,(user)=>user.reviews, {onDelete: 'CASCADE' })
  user:User;

  @ManyToOne(()=>Course,(course) =>course.reviews, {onDelete: 'CASCADE' })
  @JoinColumn({name:'course_id'})
  course:Course;

  @Column()
  rating:number;

  @Column({nullable:true })
  comment:string;

  @Column({default:false})
  deleted:boolean
}

