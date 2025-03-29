import { AppDataSource } from "../config/database";
import { Review } from "../models/Review";

export  const reviewRepository=AppDataSource.getRepository(Review)
