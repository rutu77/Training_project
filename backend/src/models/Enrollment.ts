import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Course } from './Course';

@Entity({name:'Enrollment_tbl47'})
export class Enrollment {
    @PrimaryGeneratedColumn()
    enrollment_id:number;

    @ManyToOne(()=>User,user=>user.enrollments)
    user:User;

    @ManyToOne(()=>Course,course=>course.enrollments)
    course:Course;

    @Column()
    enrollment_date:Date;

    // @Column()
    // status: string;  //active complete
} 
    