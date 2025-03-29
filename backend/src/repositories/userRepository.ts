import { AppDataSource } from "../config/database";
import { User } from "../models/User";

export  const userRepository=AppDataSource.getRepository(User)
