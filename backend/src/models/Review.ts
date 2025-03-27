import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Course } from './Course';


@Entity({name:'Review_tbl47'})
export class Review {
  @PrimaryGeneratedColumn()
  review_id:number;

  @ManyToOne(()=>User,(user)=>user.reviews)
  user:User;

  @ManyToOne(()=>Course,(course) =>course.reviews)
  course:Course;

  @Column()
  rating:number;

  @Column({nullable:true })
  comment:string;
}