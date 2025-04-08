import { Request, Response } from "express";
import { ProgressService } from "../services/progressService";
import { error } from "console";

const progressService = new ProgressService();

export class ProgressController {

  async createProgress(req: Request, res: Response) {
    try {
      const { userId, quizId, score, total } = req.body;
  
      const newProgress = await progressService.createProgress({ userId, quizId, score, total });
  
      res.status(201).json({ message: 'Progress saved successfully', data: newProgress });
    } catch (err) {
      res.status(500).json({ message: 'Error saving progress', error: (err as Error).message });
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
        console.log(userId);
        
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
  
  
    // async updateprogress(req: Request, res: Response): Promise<void> {
    //   const progressId = Number(req.params.id);
    //   const data = req.body;
    //   try {
    //     const updatedprogress = await progressService.updateprogress(progressId, data);
    //     res.status(200).json({message:"progress updated successfully", data: updatedprogress });
    //   } catch (error) {
    //     res.status(404).json({ message: (error as Error).message });
    //   }
    // }
  
    // async deleteprogress(req: Request, res: Response): Promise<void> {
    //   const progressId = Number(req.params.id);
    //   try {
    //     await progressService.deleteprogress(progressId);
    //     res.status(200).json({ message: "progress deleted successfully!" });
    //   } catch (error) {
    //     res.status(404).json({ message: (error as Error).message });
    //   }
    // }
  
    // async getAllprogresss(req: Request, res: Response): Promise<void> {
    //   try {
    //     const progresss = await progressService.getAllprogresss();
    //     res.status(200).json(progresss);
    //   } catch (error) {
    //     res.status(500).json({ error: "Error fetching progresss" });
    //   }
    // }

}





