import { AppDataSource } from "../config/database";
import { Category } from "../models/Category";

export const categoryRepository=AppDataSource.getRepository(Category)
