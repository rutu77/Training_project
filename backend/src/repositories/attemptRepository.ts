import { AppDataSource } from "../config/database";
import { Attempt } from "../models/Attempt";

export const attemptRepository=AppDataSource.getRepository(Attempt)
