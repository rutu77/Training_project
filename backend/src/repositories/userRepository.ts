import { AppDataSource } from "../config/database";
import { User } from "../models/User";

export  const userRepository=AppDataSource.getRepository(User)

export class UserRepository{

    async getUserByEmail(email:string){
        return userRepository.findOne({where:{email}})
    }
    
}