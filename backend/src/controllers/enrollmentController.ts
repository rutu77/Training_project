import { Request, Response } from "express";
import { Enrollment } from "../models/Enrollment";
import { EnrollmentService } from "../services/enrollmentService";
import { AuthRequest } from "../types/authRequest";

const enrollmentService = new EnrollmentService();
export class EnrollmentController {

  
    async createEnrollment(req: Request, res: Response){
      const user = (req as AuthRequest).user;
      const courseId = Number(req.body.courseId);
      if (!user || !Number.isInteger(courseId) || courseId <= 0) {
        res.status(400).json({ message: "A valid course ID is required" });
        return;
      }
      try {
        const enrollment = await enrollmentService.createEnrollment(user.id, courseId);
        res.status(201).json({ message: "Enrollment created successfully!", data: enrollment });
      } catch (error) {
        res.status(400).json({ error: (error as Error).message});
      }
    }
  
    async getEnrollmentById(req: Request, res: Response){
      const enrollmentId = Number(req.params.id);
      try {
        const enrollment = await enrollmentService.getEnrollmentById(enrollmentId);
        res.status(200).json({ data: enrollment });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async updateEnrollment(req: Request, res: Response): Promise<void> {
      const enrollmentId = Number(req.params.id);
      const data = req.body;
      try {
        const updatedEnrollment = await enrollmentService.updateEnrollmentById(enrollmentId, data);
        res.status(200).json({ data: updatedEnrollment });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async deleteEnrollment(req: Request, res: Response): Promise<void> {
      const enrollmentId = Number(req.params.id);
      try {
        await enrollmentService.deleteEnrollment(enrollmentId);
        res.status(200).json({ message: "Enrollment deleted successfully!" });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async getAllEnrollments(req: Request, res: Response): Promise<void> {
      try {
        const enrollments = await enrollmentService.getAllEnrollments();
        res.status(200).json(enrollments);
      } catch (error) {
        res.status(500).json({ error: "Error fetching enrollments" });
      }
    }

    async getMyEnrollments(req: Request, res: Response): Promise<void> {
      const user = (req as AuthRequest).user;
      if (!user) {
        res.status(401).json({ message: "Authentication is required" });
        return;
      }
      try {
        res.status(200).json(await enrollmentService.getEnrollmentsByUser(user.id));
      } catch (error) {
        res.status(500).json({ message: "Error fetching enrollments" });
      }
    }

    async downloadEnrollReceipt(req:Request, res:Response){
      try {
        const user = (req as AuthRequest).user;
        const courseId= Number(req.params.courseId)
        if (!user || !Number.isInteger(courseId) || courseId <= 0) {
          res.status(400).json({ message: "A valid course ID is required" });
          return;
        }
        const filePath:string = await enrollmentService.generateEnrollReceipt(courseId,user.id);
  
        res.download(filePath, `Enrollment_Receipt_${user.id}.pdf`, (err: Error) => {
          if (err) {
            res.status(500).json({ error: "Failed to download the receipt" });
          }
        });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
    
}