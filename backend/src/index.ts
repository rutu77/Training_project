import cors from "cors";
import express, { Request, Response } from "express";

import { AppDataSource } from "./config/database";

import dotenv from "dotenv"
import { authRoutes } from "./routes/authRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { AdminService } from "./services/adminService";
import { userRoutes } from "./routes/userRoutes";

const app = express();

dotenv.config()

app.use(cors({
    origin:'*',
    allowedHeaders:['Content-type','Authorization']
}));


app.use(express.json());

app.use('/auth',authRoutes)
app.use('/admin',adminRoutes)
app.use('/user',userRoutes)

// const admin= new AdminService()
AppDataSource.initialize().then(async ()=>{
    app.listen(3000,()=>{
        console.log("Server running!")
        // admin.initializeAdmin();
    })
}).catch((error: any)=>{console.log("Error occured while initializing: ",error)})