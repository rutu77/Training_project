import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { userRepository } from "../repositories/userRepository"
import { UserService } from "./userService"
import { toPublicUser } from "../utils/publicUser";
import { jwtSecret } from "../config/jwt";

const userService= new UserService

export class AuthService{

    async registerUser(userData:{name:string;email:string;password:string;requestedRole?:"user"|"teacher"}){
        const existing= await userService.getUserByEmail(userData.email);
        if (existing) {
            return { error: "User already exists! Please login." };
        }
    
        const hashedPassword= await bcrypt.hash(userData.password,10)
        const user= userRepository.create({
            name:userData.name,
            email:userData.email,
            password:hashedPassword,
            role:"user",
            teacherRequestStatus:userData.requestedRole === "teacher" ? "pending" : "none",
        });
        const savedUser = await userRepository.save(user)
        return {message:"user registered!",user:toPublicUser(savedUser)}
    }

    async loginUser(email: string, password: string) {
        const user = await userRepository
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where("user.email = :email", { email })
            .getOne();
        if (!user) return { error: "User not found!" };

        if(user.deleted) return {error:"User Deactivated"}
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return { error: "Invalid Credentials!" };
        
        const token = jwt.sign({ email: user.email, id:user.id }, jwtSecret, { expiresIn: '1h' });
        const role=user.role

        return { user: toPublicUser(user), token, role };
    }

    async getUserByEmail(email:string){
        return await userService.getUserByEmail(email)
    }

}