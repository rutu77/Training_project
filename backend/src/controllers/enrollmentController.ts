import { Request, Response } from "express";
import { Enrollment } from "../models/Enrollment";
import { EnrollmentService } from "../services/enrollmentService";

const enrollmentService = new EnrollmentService();
export class EnrollmentController {

  
    async createEnrollment(req: Request, res: Response){
      const enrollmentData: any = req.body; 
      // console.log(enrollmentData.userId, enrollmentData.courseId);
      // const userId=enrollmentData.userId;
      // const courseId=enrollmentData.courseId;
           

      try {
        const enrollment = await enrollmentService.createEnrollment(enrollmentData);
        res.status(201).json({ message: "Enrollment created successfully!", data: enrollment });
      } catch (error) {
        res.status(500).json({ error: (error as Error).message});
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
  }