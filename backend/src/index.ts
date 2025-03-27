import cors from "cors";
import express, { Request, Response } from "express";

import { AppDataSource } from "./config/database";

import dotenv from "dotenv"
import { authRoutes } from "./routes/authRoutes";
import { adminRoutes } from "./routes/adminRoutes";

const app = express();

dotenv.config()

app.use(cors({
    origin:'*',
    allowedHeaders:['Content-type','Authorization']
}));


app.use(express.json());

app.use('/auth',authRoutes)
app.use('/admin',adminRoutes)

AppDataSource.initialize().then(async ()=>{
    app.listen(3000,()=>{
        console.log("Server running!")
    })
}).catch((error)=>{console.log("Error occured while initializing: ",error)})