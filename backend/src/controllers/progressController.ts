import { Request, Response } from "express";
import { ProgressService } from "../services/progressService";

const progressService = new ProgressService();

export class ProgressController {

    async getprogressById(req: Request, res: Response): Promise<void> {
      const progressId = Number(req.params.id);
      try {
        const progress = await progressService.getprogressById(progressId);
        res.status(200).json({ data: progress });
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

    async getProgressByUser(req: Request, res: Response): Promise<void> {
      const userId = Number(req.params.id);
      try {
        const progress = await progressService.getProgressByUser(userId);
        res.status(200).json({ data: progress });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }


    async downloadProgressReport(req: Request, res: Response): Promise<void> {
      try {
        const userId = Number(req.params.id);
        const filePath:string = await progressService.generateProgressReport(userId);
  
        res.download(filePath, `quiz_progress_report_${userId}.pdf`, (err: Error) => {
          if (err) {
            res.status(500).json({ error: "Failed to download the report" });
          }
        });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
    async deleteprogress(req: Request, res: Response): Promise<void> {
      const progressId = Number(req.params.id);
      try {
        await progressService.deleteProgress(progressId);
        res.status(200).json({ message: "progress deleted successfully!" });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  


}




