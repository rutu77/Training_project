import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserRepository, userRepository } from "../repositories/userRepository"


const secretKey= "Rutuja1147"

const userRepo= new UserRepository()

export class AuthService{

    async registerUser(name:string, email:string, password:string, role:'user'|'teacher'){
        const existing= await userRepo.getUserByEmail(email);
        if(existing) return {error:"User already exist! Please Login."}

        const hashedPassword= await bcrypt.hash(password,10)
        const user= userRepository.create({name,email,password:hashedPassword,role});
        await userRepository.save(user)
        return {message:"user registered!",user}
    }

    async loginUser(email: string, password: string) {
        const user = await userRepo.getUserByEmail(email);
        if (!user) return { error: "User not found!" };
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return { error: "Invalid Credentials!" };
    
        const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
        return { user, token };
    }

    async getUserByEmail(email:string){
        return await userRepo.getUserByEmail(email)
    }

}