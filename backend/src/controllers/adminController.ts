import { AdminService } from "../services/adminService";
import { AuthService } from "../services/authService";
import { Request, Response } from "express";
import { toPublicUser } from "../utils/publicUser";
import { User } from "../models/User";

const adminService= new AdminService()

export class AdminController{

    async getPendingTeacherRequests(_req: Request, res: Response) {
        try {
            const requests = await adminService.getPendingTeacherRequests();
            res.status(200).json({ data: requests.map(toPublicUser) });
        } catch (error) {
            res.status(500).json({ message: "Unable to load teacher requests" });
            console.error(error);
        }
    }

    async reviewTeacherRequest(req: Request, res: Response) {
        const userId = Number(req.params.id);
        const { decision } = req.body as { decision: "approved" | "rejected" };
        try {
            const result = await adminService.reviewTeacherRequest(userId, decision);
            if ("error" in result) {
                res.status(result.status).json({ message: result.error });
                return;
            }
            res.status(200).json({
                message: decision === "approved" ? "Teacher access approved" : "Teacher request rejected",
                data: toPublicUser(result),
            });
        } catch (error) {
            res.status(500).json({ message: "Unable to review teacher request" });
            console.error(error);
        }
    }

    async updateRole(req: Request, res: Response) {
        const { email, newRole } = req.body;
        if (typeof email !== "string" || !["user", "teacher", "admin"].includes(newRole)) {
            res.status(400).json({ message: "A valid email and role are required" });
            return;
        }
        try {
            const updatedUser = await adminService.updateUserRole(email, newRole);
            if ("error" in updatedUser) {
                res.status(404).json({ message: updatedUser.error });
                return;
            }
            res.status(200).json({ message: "User role updated successfully!", data: toPublicUser(updatedUser as User) });
        } catch (error) {
            res.status(400).json({ message: error });
            console.log(error);
        }
    }

    async registerAdmin(req: Request, res: Response): Promise<void> {
        const { name, email, password, secretKey } = req.body;
        // console.log({ name, email, password, secretKey });
    
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
            if (!result.admin) {
                res.status(500).json({ message: "Admin registration did not return a user" });
                return;
            }
            res.status(201).json({ message: "Admin Registered successfully!", data: toPublicUser(result.admin) });
            console.log("Admin Registered successfully!!");
        } catch (error) {
            res.status(500).json({ message: error });
            console.log(error);
        }
    }


}