import { Request ,Response} from "express";
import { AttemptService } from "../services/attemptServices";
import { Attempt } from "../models/Attempt";


export class AttemptController{
    attemptService= new AttemptService()

    async createAttempt(req: Request, res: Response){
      const AttemptData: Partial<Attempt> = req.body;
      try {
        const Attempt = await this.attemptService.createAttempt(AttemptData);
        res.status(201).json({ message: "Attempt created successfully!", data: Attempt });
      } catch (error) {
        res.status(500).json({ error: "Error creating enrollment" });
      }
    }

    async getAttemptById(req:Request,res:Response){
        const AttemptId = Number(req.params.id);
        try {
          const Attempt = await this.attemptService.getAttemptById(AttemptId);
          res.status(200).json({data:Attempt});
        } catch (error) {
          res.status(404).json({ message: (error as Error).message });
        }
    }
    
    async updateAttempt(req: Request, res:Response){
       const AttemptId = Number(req.params.id);
        const data = req.body;
        try{
          const updatedAttempt=await this.attemptService.updateAttemptById(AttemptId,data);
          res.status(200).json({message:"Attempt updated successfully",data:updatedAttempt});
        } catch(error){
          res.status(404).json({message:(error as Error).message});
        }
    }
    
    async deleteAttempt(req:Request,res:Response){
        const AttemptId=Number(req.params.id);
        try{
          await this.attemptService.deleteAttempt(AttemptId);
          res.status(204).json({ message:"Attempt deleted successfully!" });
        } catch(error){
          res.status(404).json({ message:(error as Error).message });
        }
    }
    
    async getAllAttempts(req:Request,res:Response){
        try{
          const Attempts=await this.attemptService.getAllAttempts();
          res.status(200).json(Attempts);
        }catch(error){
          res.status(500).json({error:"Error fetching Attempts" });
        }
    }
}