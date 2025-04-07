import { Request ,Response} from "express";
import { QuestionService } from "../services/questionServices";
import { Question } from "../models/Question";

const questionService= new QuestionService()

export class QuestionController{

    async createQuestion(req: Request, res: Response){
      const QuestionData: Partial<Question> = req.body;
      try {
        const Question = await questionService.createQuestion(QuestionData);
        res.status(201).json({ message: "Question created successfully!", data: Question });
      } catch (error) {
        // res.status(500).json({ error: "Error creating Question" });
        res.status(500).json({ error: error });

      }
    }

    async getQuestionById(req:Request,res:Response){
        const QuestionId = Number(req.params.id);
        try {
          const Question = await questionService.getQuestionById(QuestionId);
          res.status(200).json({data:Question});
        } catch (error) {
          res.status(404).json({ message: (error as Error).message });
        }
    }
    
    async updateQuestion(req: Request, res:Response){
       const QuestionId = Number(req.params.id);
        const data = req.body;
        try{
          const updatedQuestion=await questionService.updateQuestionById(QuestionId,data);
          res.status(200).json({message:"Question updated successfully",data:updatedQuestion});
        } catch(error){
          res.status(404).json({message:(error as Error).message});
        }
    }
    
    async deleteQuestion(req:Request,res:Response){
        const QuestionId=Number(req.params.id);
        try{
          await questionService.deleteQuestion(QuestionId);
          res.status(204).json({ message:"Question deleted successfully!" });
        } catch(error){
          res.status(404).json({ message:(error as Error).message });
        }
    }
    
    async getAllQuestions(req:Request,res:Response){
        try{
          const Questions=await questionService.getAllQuestions();
          res.status(200).json(Questions);
        }catch(error){
          res.status(500).json({error:"Error fetching Questions" });
        }
    }

    async getQuestionsByQuiz(req:Request,res:Response){
      try{
        const quizId= Number(req.params.id);
        const questions= await questionService.getQuestionsByQuiz(quizId);
        res.status(200).json(questions);
      } catch (error) {
        res.status(500).json({ error: "Error fetching questions" });
      }
    }
}