import { Request, Response } from "express";
import { ProgressService } from "../services/progressService";

const progressService = new ProgressService();

export class ProgressController {

  async createprogress(req: Request, res: Response){
    const progressData = req.body;
    try {
      const progress = await progressService.createprogress(progressData);
      res.status(201).json({ message: "progress created successfully!", data: progress });
    } catch (error) {
      res.status(500).json({ error: "Error creating progress" });
    //   res.status(500).json({ error: error });

    }
  }  

    async getprogressById(req: Request, res: Response): Promise<void> {
      const progressId = Number(req.params.id);
      try {
        const progress = await progressService.getprogressById(progressId);
        res.status(200).json({ data: progress });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async updateprogress(req: Request, res: Response): Promise<void> {
      const progressId = Number(req.params.id);
      const data = req.body;
      try {
        const updatedprogress = await progressService.updateprogress(progressId, data);
        res.status(200).json({message:"progress updated successfully", data: updatedprogress });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async deleteprogress(req: Request, res: Response): Promise<void> {
      const progressId = Number(req.params.id);
      try {
        await progressService.deleteprogress(progressId);
        res.status(200).json({ message: "progress deleted successfully!" });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async getAllprogresss(req: Request, res: Response): Promise<void> {
      try {
        const progresss = await progressService.getAllprogresss();
        res.status(200).json(progresss);
      } catch (error) {
        res.status(500).json({ error: "Error fetching progresss" });
      }
    }
}