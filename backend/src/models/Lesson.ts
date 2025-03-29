import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Course } from './Course';
import { Progress } from './Progress';

@Entity({name:"Lesson_tbl47"})
export class Lesson {
    @PrimaryGeneratedColumn()
    lesson_id:number;

    @Column()
    title:string;

    @Column()
    videoUrl:string;

    @Column({nullable:true})
    duration:number;

    @ManyToOne(()=>Course,(course)=>course.lessons)
    course:Course;

    @OneToMany(()=>Progress,(progress)=>progress.lesson)
    progress:Progress[];
}