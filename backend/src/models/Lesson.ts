import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Course } from './Course';
import { Progress } from './Progress';

@Entity({name:"Lesson_tbl47"})
export class Lesson {
    @PrimaryGeneratedColumn()
    lesson_id:number;

    @Column()
    title:string;

    @Column({nullable:true})
    videoUrl:string;

    @Column({nullable:true})
    duration:number;

    @ManyToOne(()=>Course,(course)=>course.lessons, { onDelete: 'CASCADE' })
    course:Course;

    @OneToMany(()=>Progress,(progress)=>progress.lesson,{ cascade: true })
    progress:Progress[];
}