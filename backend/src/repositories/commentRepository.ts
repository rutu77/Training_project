import { AppDataSource } from "../config/database";
import { Comment } from "../models/Comment";

export const commentRepository=AppDataSource.getRepository(Comment)
