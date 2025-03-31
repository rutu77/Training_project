import { AppDataSource } from "../config/database";
import { Progress } from "../models/Progress";


export  const progressRepository=AppDataSource.getRepository(Progress)
