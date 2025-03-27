import { AuthService } from "../services/authService";
import { Request, Response } from "express";


const authService= new AuthService()

export class AuthController{

    async Register(req:Request, res:Response){
        const {name,email,password,role}= req.body;
        console.log({name,email,password,role});
        try{
            const result= await authService.registerUser(name,email,password,role)
            if(result.error){
                res.status(400).json({ message: result.error });
                console.log(result.error);
                return;
            }
            res.status(200).json({message:"Data saved to DB!", data:result.user});
        }catch(error){
            res.status(500).json({error})
        } 
    }

    async login(req:Request,res:Response){
        const {email,password}=req.body;
        try{
            const result= await authService.loginUser(email,password);
            const data={user:result.user,token:result.token}
            if(result.error){
                res.status(400).json({ message: result.error });
                console.log(result.error);
                return;
            }
            res.status(201).json({message:"Login Successful!", data:data})
            console.log("Login Successful!");
        }catch(error){
            res.status(500).json({error})
        } 
    }

}