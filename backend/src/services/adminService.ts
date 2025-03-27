import bcrypt from "bcrypt"
import { UserRepository,userRepository } from "../repositories/userRepository"

const userRepo= new UserRepository()

export class AdminService{

    async getUserByEmail(email:string){
        return await userRepo.getUserByEmail(email)
    }

    async updateUserRole(email: string, newRole: 'user' | 'teacher' | 'admin') {
        const user = await userRepo.getUserByEmail(email);
        if (!user) return {error:"User not found!"};
    
        user.role = newRole;
        await userRepository.save(user);
        return user;
    }

    async registerAdmin(secretKey:string, data:any){
        if(secretKey !== process.env.ADMIN_SECRET_KEY){
            return {error: "Invalid secret key!"}
        }
        const existing= await userRepository.findOne(({where:{email:data.email}}))
        if(existing){return {error:  "Admin already exist"}}

        const hashedPassword= await bcrypt.hash(data.password,10)

        const admin= userRepository.create({name:data.name,email:data.email,password:hashedPassword,role:'admin'});
        await userRepository.save(admin)
        return {message:'admin account created successfully',admin}
    }
}