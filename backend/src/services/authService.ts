import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { userRepository } from "../repositories/userRepository"
import { UserService } from "./userService"


const secretKey= "Rutuja1147"

const userService= new UserService

export class AuthService{

    async registerUser(name:string, email:string, password:string, role:'user'|'teacher'){
        const existing= await userService.getUserByEmail(email);
        if(existing) return {error:"User already exist! Please Login."}

        const hashedPassword= await bcrypt.hash(password,10)
        const user= userRepository.create({name,email,password:hashedPassword,role});
        await userRepository.save(user)
        return {message:"user registered!",user}
    }

    async loginUser(email: string, password: string) {
        const user = await userService.getUserByEmail(email);
        if (!user) return { error: "User not found!" };
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return { error: "Invalid Credentials!" };
        
        const token = jwt.sign({ email: user.email, id:user.id }, secretKey, { expiresIn: '1h' });
        const role=user.role
        return { user, token, role };        
    }

    async getUserByEmail(email:string){
        return await userService.getUserByEmail(email)
    }

}