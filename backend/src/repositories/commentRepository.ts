import { AppDataSource } from "../config/database";
import { Comment } from "../models/Comment";

export const commentRepo=AppDataSource.getRepository(Comment)
