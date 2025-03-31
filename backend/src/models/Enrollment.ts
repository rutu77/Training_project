import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Course } from './Course';

@Entity({name:'Enrollment_tbl47'})
export class Enrollment {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>User,user=>user.enrollments, { onDelete: 'CASCADE' })
    user:User;

    @ManyToOne(()=>Course,course=>course.enrollments, { onDelete: 'CASCADE' })
    @JoinColumn({name:'course_id'})
    course:Course;

    @Column()
    enrollment_date:Date;

    @Column({default:"in_progress"})
    status: "in_progress"|"completed"; 
} 
    