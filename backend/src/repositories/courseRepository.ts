import { AppDataSource } from "../config/database";
import { Course } from "../models/Course";

export const courseRepo=AppDataSource.getRepository(Course)
