import { RegisterDto } from "../dto/registerdto";
import { AuthService } from "../services/authService";
import { Request, Response } from "express";


const authService= new AuthService()

export class AuthController{

    async Register(req:Request, res:Response){
        const userData= new RegisterDto()
        userData.name= req.body.name
        userData.email= req.body.email
        userData.password= req.body.password
        userData.role= req.body.role
        // const {name,email,password,role}= req.body;
        console.log(userData);
        try{
            const result= await authService.registerUser(userData)
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
            // const data={user:result.user,token:result.token}
            // console.log(result.token);
            
            if(result.error){
                res.status(400).json({ message: result.error });
                console.log(result.error);
                return;
            }
            res.status(201).json({message:"Login Successful!", data:{user:result.user,token:result.token,role:result.role}})
            console.log("Login Successful!");
        }catch(error){
            res.status(500).json({error})
        } 
    }

}