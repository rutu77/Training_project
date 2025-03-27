import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Course } from './Course';


@Entity({name:"Category_tbl47"})
export class Category {
  @PrimaryGeneratedColumn()
  category_id:number;

  @Column()
  name:string;

  @Column({nullable:true})
  description:string;

  @OneToMany(()=>Course,(course) =>course.category)
  courses:Course[];
}