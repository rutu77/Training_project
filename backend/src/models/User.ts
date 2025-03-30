import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Course } from './Course';
import { Enrollment } from './Enrollment';
import { Attempt } from './Attempt';
import { Comment } from './Comment';
import { Review } from './Review';
import { Progress } from './Progress';

@Entity({name:"User_tbl47"})
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({ unique: true })
    email:string;

    @Column()
    password:string;

    @Column({default:'user'})
    role: 'user'|'teacher'|'admin';


    @Column({nullable:true})
    profilePicture: string;

    @Column({nullable:true})
    bio: string;

    @CreateDateColumn()
    createdAt:Date;

    @OneToMany(()=>Course,(course)=>course.creator, { cascade: true, onDelete: 'CASCADE' })
    courses:Course[];

    @OneToMany(()=>Enrollment,(enrollment)=>enrollment.user, { cascade: true, onDelete: 'CASCADE' })
    enrollments:Enrollment[];

    @OneToMany(()=>Attempt,(attempt)=>attempt.user, { cascade: true, onDelete: 'CASCADE' })
    attempts:Attempt[];

    @OneToMany(()=>Comment,(comment)=>comment.user, { cascade: true, onDelete: 'CASCADE' })
    comments:Comment[];

    @OneToMany(()=>Review,(review)=>review.user, { cascade: true, onDelete: 'CASCADE' })
    reviews:Review[];

    @OneToMany(() =>Progress,(progress)=>progress.user, { cascade: true, onDelete: 'CASCADE' })
    progress: Progress[];
}