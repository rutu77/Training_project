import { Request, Response } from "express";
import { ProgressService } from "../services/progressService";
import { AuthRequest } from "../types/authRequest";
import { toProgressResponse } from "../utils/progressResponse";

const progressService = new ProgressService();

export class ProgressController {

    async getprogressById(req: Request, res: Response): Promise<void> {
      const progressId = Number(req.params.id);
      try {
        const progress = await progressService.getprogressById(progressId);
        res.status(200).json({ data: toProgressResponse(progress) });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }

    async getAllprogresss(req: Request, res: Response): Promise<void> {
      try {
        const progresss = await progressService.getAllprogresss();
        res.status(200).json(progresss.map(toProgressResponse));
      } catch (error) {
        res.status(500).json({ error: "Error fetching progresss" });
      }
    }

    async getManageProgress(req: Request, res: Response): Promise<void> {
      const user = (req as AuthRequest).user;
      if (!user) {
        res.status(401).json({ message: "Authentication is required" });
        return;
      }
      try {
        const progress = await progressService.getManageProgress(user);
        res.status(200).json(progress.map(toProgressResponse));
      } catch (error) {
        console.error("Error fetching managed progress:", error);
        res.status(500).json({ error: "Error fetching progress" });
      }
    }

    async getProgressByUser(req: Request, res: Response): Promise<void> {
      const userId = Number(req.params.id);
      try {
        const progress = await progressService.getProgressByUser(userId);
        res.status(200).json({ data: progress.map(toProgressResponse) });
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

