import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController{
    userService= new UserService()

    async getUserById(req:Request,res:Response){
        const userId= Number(req.params.id)
        try{
        const user= await this.userService.getUserById(userId)
        res.status(200).json({data:user});
        }catch(error){
            res.status(404).json({ message: (error as Error).message });
        }
    }


    async updateUser(req:Request,res:Response){
        const userId= Number(req.params.id)
        const data= req.body
        try{
        const updatedUser= await this.userService.updateUserById(userId,data)
        res.status(200).json({message:"User updated successfully",data:updatedUser})
        }
        catch(error){
            res.status(404).json({ message: (error as Error).message });
        }
    }

    async deleteUser(req:Request,res:Response){
        const userId= Number(req.params.id)
        try{
        await this.userService.deleteUser(userId)
        res.status(200).json({message:"User deleted successfully"})
        } catch(error){
        res.status(404).json({ message:(error as Error).message });
        }
    }

    async getAllUsers(req:Request,res:Response){
        try{
            const users= await this.userService.getAllUsers();
            res.status(200).json(users)
        }
        catch(error){
            res.status(500).json({error:"Error getting all users"})
        }
    }
}