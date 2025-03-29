import { AppDataSource } from "../config/database";
import { Lesson } from "../models/Lesson";

export  const lessonRepository=AppDataSource.getRepository(Lesson)
