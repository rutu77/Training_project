import { User } from "../models/User";
import { userRepository } from "../repositories/userRepository";

export class UserService{

    async getUserByEmail(email:string){
        return await userRepository.findOne({where:{email}})
    }

    async getUserById(id:number){
        const user= await userRepository.findOne({where:{id}})
        if(!user) throw Error("User not found!")
        return user;
    }

    async updateUserById(id:number,data:Partial<User>){
        await userRepository.update(id,data)
        const updatedUser= await userRepository.findOne({where:{id}});
        if(!updatedUser) throw new Error("User not found!")
        return updatedUser;
    }

    async deleteUser(id:number){
        const result= await userRepository.delete(id);
        if(result.affected===0) throw new Error("User not found!")
    }

    async getAllUsers(){
        return await userRepository.find();
    }
}