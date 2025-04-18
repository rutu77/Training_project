import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Course } from './Course';

@Entity({name:'Enrollment_table147'})
export class Enrollment {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>User,user=>user.enrollments, { onDelete: 'CASCADE' })
    user:User;

    @Column({default:false})
    deleted:boolean

    @ManyToOne(()=>Course,course=>course.enrollments, { onDelete: 'CASCADE' })
    @JoinColumn({name:'course_id'})
    course:Course;

    @CreateDateColumn()
    enrollment_date:Date;

    @Column({default:"in_progress"})
    status: "in_progress"|"completed"; 
} 
    