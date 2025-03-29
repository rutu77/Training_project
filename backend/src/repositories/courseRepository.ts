import { AppDataSource } from "../config/database";
import { Course } from "../models/Course";

export const courseRepository=AppDataSource.getRepository(Course)
