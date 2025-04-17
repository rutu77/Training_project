import { DataSource } from "typeorm";
import dotenv from "dotenv"
import {User} from "../models/User"
import { Course } from "../models/Course";
import { Enrollment } from "../models/Enrollment";
import { Lesson } from "../models/Lesson";
import { Quiz } from "../models/Quiz";
import { Review } from "../models/Review";
import { Comment } from "../models/Comment";
import { Progress } from "../models/Progress";
import { Question } from "../models/Question";


dotenv.config(); 

export const AppDataSource= new DataSource({
    type:"mssql",
    port : Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    // entities:["src/models/*.ts"],
    entities:[User,Course,Enrollment, Lesson, Quiz, Review, Question, Comment, Progress],
    synchronize:true, 
    options:{
        encrypt:false,
        trustServerCertificate:true
    }
})



