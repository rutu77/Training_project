import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Lesson } from "./Lesson";
import { Quiz } from "./Quiz";

@Entity({ name: "Progress_table147" })
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.progress, { onDelete: "CASCADE" })
  user: User; 

  @Column({ default: false })
  deleted: boolean;

  @ManyToOne(() => Quiz)
  @JoinColumn({ name: "quiz_id" })
  quiz: Quiz;


  @Column({default:1})
  attempt:number//

  @Column()
  score: number;

  @Column()
  total: number;

  // @Column({ default: false })
  // completed: boolean; //

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  completion: Date;

  // @ManyToOne(() => Lesson, (lesson) => lesson.progress, { onDelete: "CASCADE" })
  // lesson: Lesson; //
}
