import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Course } from './Course';
import { Progress } from './Progress';

@Entity({name:"Lesson_tbl47"})
export class Lesson {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column({nullable:true})
    videoUrl:string;

    @Column({nullable:true})
    duration:number;

    // @Column()
    // completed: false 

    @ManyToOne(() => Course, (course) => course.lessons, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "course_id" }) 
    course: Course;

    // @OneToMany(()=>Progress,(progress)=>progress.lesson,{ cascade: true })
    // progress:Progress[];
}