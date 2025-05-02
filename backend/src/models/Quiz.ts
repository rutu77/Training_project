import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Course } from "./Course";
import { Question } from "./Question";

@Entity({ name: "Quiz_table147" })
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  deleted: boolean;

  @ManyToOne(() => Course, (course) => course.quizzes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "course_id" })
  course: Course;

  @OneToMany(() => Question, (question) => question.quiz, { cascade: true })
  questions: Question[];
}
