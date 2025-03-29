import { User } from "../models/User";
import { userRepository } from "../repositories/userRepository";

export class UserService{

    async getUserByEmail(email:string){
        return userRepository.findOne({where:{email}})
    }

    async getUserById(id:number){
        const user=userRepository.findOne({where:{id}})
        if(!user){
            return {message:`User with ID ${id} not found`}
        }
        return user;
    }

    async updateUserById(id:number,data:Partial<User>){
        const user= await userRepository.update(id,data)
        return user;
    }

    async deleteUser(id:number){
        return await userRepository.delete(id)
    }

    async getAllUsers(){
        return await userRepository.find();
    }

}