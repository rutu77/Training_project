import { DataSource } from "typeorm";
import dotenv from "dotenv"
import {User} from "../models/User"

dotenv.config(); // loads the environment variables from your .env file into process.env.

export const AppDataSource= new DataSource({
    type:"mssql",
    port : Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    entities:[User],
    synchronize:true, // Automatically synchronizes the database schema with the entities each time the application runs.
    options:{
        encrypt:false,
        trustServerCertificate:true
    }
})