import { User } from "../models/User";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt"
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
        const existingUser = await userRepository.findOne({ where: { id } });
        if (!existingUser) throw new Error("User not found!");
        if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
        }        
       
        await userRepository.update({ id: +id }, data);
        const updatedUser = await userRepository.findOne({ where: { id } });
        if(!updatedUser) throw new Error("User not found!")
        return updatedUser;
    }

    async deleteUser(id:number){
        const result = await userRepository.update(id,{deleted:true});
        if (!result.affected) throw new Error("User not found!");
    }

    async getAllUsers(){
        return await userRepository.find();
    }

   async updateProfilePicture(userId: string, filename: string) {
        const user = await userRepository.findOne({ where: { id: +userId } });
        if (!user) throw new Error("User not found!");
        user.profilePicture = filename;
        await userRepository.save(user);
        return user;
    }  
}