import { AppDataSource } from "../config/database";
import { Question } from "../models/Question";

export const QuestionRepository=AppDataSource.getRepository(Question)
