import bcrypt from "bcrypt"
import {userRepository } from "../repositories/userRepository"
import { UserService } from "./userService";

const userService= new UserService()

export class AdminService{

    async getPendingTeacherRequests() {
        return await userRepository.find({
            where: { teacherRequestStatus: "pending" },
            order: { createdAt: "ASC" },
        });
    }

    async reviewTeacherRequest(userId: number, decision: "approved" | "rejected") {
        const user = await userRepository.findOneBy({ id: userId });
        if (!user) return { error: "User not found", status: 404 as const };
        if (user.teacherRequestStatus !== "pending") {
            return { error: "Teacher request is no longer pending", status: 409 as const };
        }

        user.teacherRequestStatus = decision;
        if (decision === "approved") user.role = "teacher";
        await userRepository.save(user);
        return user;
    }

    async getUserByEmail(email:string){
        return await userService.getUserByEmail(email)
    }

    async updateUserRole(email: string, newRole: 'user' | 'teacher' | 'admin') {
        if (!["user", "teacher", "admin"].includes(newRole)) {
            return { error: "Invalid role" };
        }
        const user = await userService.getUserByEmail(email);
        if (!user) return {error:"User not found!"};
    
        user.role = newRole;
        if (newRole === "teacher") user.teacherRequestStatus = "approved";
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