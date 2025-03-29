import { AppDataSource } from "../config/database";
import { Enrollment } from "../models/Enrollment";

export  const enrollRepository=AppDataSource.getRepository(Enrollment)
