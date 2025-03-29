import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController{
    userService= new UserService()

    async getUserById(req:Request,res:Response){
        const userId= Number(req.params.id)
        const user= await this.userService.getUserById(userId)
        res.status(200).json(user)
    }

    async updateUser(req:Request,res:Response){
        const userId= Number(req.params.id)
        const data= req.body
        const updatedUser= await this.userService.updateUserById(userId,data)
        res.status(200).json(updatedUser)
    }

    async deleteUser(req:Request,res:Response){
        const userId= Number(req.params.id)
        await this.userService.deleteUser(userId)
        res.status(204).send();
    }

    async getAllUsers(req:Request,res:Response){
        const users= await this.userService.getAllUsers();
        res.status(200).json(users)
    }
}