import { AppDataSource } from "../config/database";
import { Quiz } from "../models/Quiz";


export  const quizRepository=AppDataSource.getRepository(Quiz)
