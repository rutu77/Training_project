import { AdminService } from "../services/adminService";
import { AuthService } from "../services/authService";
import { Request, Response } from "express";

const adminService= new AdminService()

export class AdminController{

    async updateRole(req: Request, res: Response) {
        const { email, newRole } = req.body;
        console.log({email, newRole})
        try {
            const updatedUser = await adminService.updateUserRole(email, newRole);
            res.status(200).json({ message: "User role updated successfully!", data: updatedUser });
            console.log("User role updated successfully!");
        } catch (error) {
            res.status(400).json({ message: error });
            console.log(error);
        }
    }

    async registerAdmin(req: Request, res: Response): Promise<void> {
        const { name, email, password, secretKey } = req.body;
        console.log({ name, email, password, secretKey });
    
        if (!email || !password || !secretKey) {
            res.status(400).json({ message: 'Name, email, password, and secret key are required' });
            return; 
        }
    
        try {
            const result = await adminService.registerAdmin(secretKey, { name, email, password });
            if (result.error) {
                res.status(400).json({ message: result.error });
                console.log(result.error);
                return;
            }
            res.status(200).json({ message: "Admin Registered successfully!", data: result.admin });
            console.log("Admin Registered successfully!!");
        } catch (error) {
            res.status(500).json({ message: error });
            console.log(error);
        }
    }

}