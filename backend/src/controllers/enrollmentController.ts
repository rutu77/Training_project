import { Request, Response } from "express";
import { Enrollment } from "../models/Enrollment";
import { EnrollmentService } from "../services/enrollmentService";

export class EnrollmentController {
    enrollmentService = new EnrollmentService();
  
    async createEnrollment(req: Request, res: Response){
      const enrollmentData: Partial<Enrollment> = req.body;
      try {
        const enrollment = await this.enrollmentService.createEnrollment(enrollmentData);
        res.status(201).json({ message: "Enrollment created successfully!", data: enrollment });
      } catch (error) {
        res.status(500).json({ error: "Error creating enrollment" });
      }
    }
  
    async getEnrollmentById(req: Request, res: Response){
      const enrollmentId = Number(req.params.id);
      try {
        const enrollment = await this.enrollmentService.getEnrollmentById(enrollmentId);
        res.status(200).json({ data: enrollment });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async updateEnrollment(req: Request, res: Response): Promise<void> {
      const enrollmentId = Number(req.params.id);
      const data = req.body;
      try {
        const updatedEnrollment = await this.enrollmentService.updateEnrollmentById(enrollmentId, data);
        res.status(200).json({ data: updatedEnrollment });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async deleteEnrollment(req: Request, res: Response): Promise<void> {
      const enrollmentId = Number(req.params.id);
      try {
        await this.enrollmentService.deleteEnrollment(enrollmentId);
        res.status(200).json({ message: "Enrollment deleted successfully!" });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async getAllEnrollments(req: Request, res: Response): Promise<void> {
      try {
        const enrollments = await this.enrollmentService.getAllEnrollments();
        res.status(200).json(enrollments);
      } catch (error) {
        res.status(500).json({ error: "Error fetching enrollments" });
      }
    }
  }