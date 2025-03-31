import { DataSource } from "typeorm";
import dotenv from "dotenv"
import {User} from "../models/User"
import { Course } from "../models/Course";
import { Enrollment } from "../models/Enrollment";
import { Lesson } from "../models/Lesson";
import { Quiz } from "../models/Quiz";
import { Review } from "../models/Review";
// import { Category } from "../models/Category";
import { Comment } from "../models/Comment";
import { Progress } from "../models/Progress";
import { Question } from "../models/Question";


dotenv.config(); // loads the environment variables from your .env file into process.env.

export const AppDataSource= new DataSource({
    type:"mssql",
    port : Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    // entities:["src/models/*.ts"],
    entities:[User,Course,Enrollment, Lesson, Quiz, Review, Question, Comment, Progress],
    synchronize:true, // Automatically synchronizes the database schema with the entities each time the application runs.
    options:{
        encrypt:false,
        trustServerCertificate:true
    }
})



