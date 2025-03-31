import { Request, Response } from "express";
import { LessonService } from "../services/lessonService";
import { error } from "console";

const lessonService = new LessonService()

export class LessonController{
  
    async createLesson(req: Request, res: Response){
      const lessonData = req.body;
      try {
        const lesson = await lessonService.createlesson(lessonData);
        res.status(201).json({ message: "lesson created successfully!", data: lesson });
      } catch (error) {
        res.status(500).json({ error: "Error creating lesson" });
      }
    }

    async getLessonById(req:Request, res:Response){
        const lessonId= Number(req.params.id)
        try{
            const lesson= await lessonService.getLessonById(lessonId)
            res.status(200).json({data:lesson})
        }
        catch(error){
            res.status(404).json({message:(error as Error).message})
        }
    }

    async updateLesson(req: Request, res:Response){
        const lessonId = Number(req.params.id);
         const data = req.body;
         try{
           const updatedLesson=await lessonService.updateLesson(lessonId,data);
           res.status(200).json({message:"Lesson updated successfully",data:updatedLesson});
         } catch(error){
           res.status(404).json({message:(error as Error).message});
         }
     }
     
     async deleteLesson(req:Request,res:Response){
         const lessonId=Number(req.params.id);
         try{
           await lessonService.deleteLesson(lessonId);
           res.status(200).json({ message:"Lesson deleted successfully!" });
         } catch(error){
           res.status(404).json({ message:(error as Error).message });
         }
     }
     
     async getAllLesson(req:Request,res:Response){
         try{
           const lessons=await lessonService.getAllLessons();
           res.status(200).json(lessons);
         }catch(error){
           res.status(500).json({error:"Error fetching lessons" });
         }
     }
 }