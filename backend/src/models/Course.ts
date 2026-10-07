import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { ValueTransformer } from "typeorm";
import { User } from "./User";
import { Lesson } from "./Lesson";
import { Quiz } from "./Quiz";
import { Comment } from "./Comment";
import { Review } from "./Review";
// import { Category } from './Category';
import { Enrollment } from "./Enrollment";

const decimalNumberTransformer: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string | number) => Number(value),
};

@Entity({ name: "Course_table" })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  level: "beginner" | "intermediate" | "advanced";

  @Column({ nullable: true })
  duration: number;

  @Column({ type: "decimal", default: 0, transformer: decimalNumberTransformer })
  price: number;

  @Column({ default: false })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  deleted: boolean;

  @ManyToOne(() => User, (user) => user.courses, { cascade: true, eager: true })
  creator: User;

  @OneToMany(() => Lesson, (lesson) => lesson.course, {
    cascade: true,
    onDelete: "CASCADE",
  })
  lessons: Lesson[];

  @OneToMany(() => Quiz, (quiz) => quiz.course, {
    cascade: true,
    onDelete: "CASCADE",
  })
  quizzes: Quiz[];

  @OneToMany(() => Comment, (comment) => comment.course, {
    cascade: true,
    onDelete: "CASCADE",
  })
  comments: Comment[];

  @OneToMany(() => Review, (review) => review.course, {
    cascade: true,
    onDelete: "CASCADE",
  })
  reviews: Review[];

  @OneToMany(() => Enrollment, (enrollments) => enrollments.course, {
    cascade: true,
    onDelete: "CASCADE",
  })
  enrollments: Enrollment[];
}
