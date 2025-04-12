import { Request, Response } from "express";
import { QuizService } from "../services/quizService";
import { Quiz } from "../models/Quiz";

const quizService = new QuizService();

export class QuizController{


    async createQuiz(req: Request, res: Response){
      const {courseId,title} = req.body;
      const userId= Number(req.params.id)
      console.log(courseId);
      
      try {
        const quiz = await quizService.createQuiz({courseId,title,userId});
        res.status(201).json({ message: "Quiz created successfully!", data: quiz });
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    }
    
    async getQuizById(req: Request, res: Response): Promise<void> {
      const quizId = Number(req.params.id);
      try {
        const quiz = await quizService.getQuizById(quizId);
        res.status(200).json({ data: quiz });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async updateQuiz(req: Request, res: Response): Promise<void> {
      const quizId = Number(req.params.id);
      const data = req.body;
      try {
        const updatedQuiz = await quizService.updateQuizById(quizId, data);
        res.status(200).json({message:"Quiz updated successfully", data: updatedQuiz });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async deleteQuiz(req: Request, res: Response): Promise<void> {
      const quizId = Number(req.params.id);
      try {
        await quizService.deleteQuiz(quizId);
        res.status(200).json({ message: "Quiz deleted successfully!" });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async getAllQuizzes(req: Request, res: Response): Promise<void> {
      try {
        const quizzes = await quizService.getAllQuizzes();
        res.status(200).json(quizzes);
      } catch (error) {
        res.status(500).json({ error: "Error fetching quizzes" });
      }
    }

    async getQuizzesByCourse(req:Request,res:Response){
      try{
        const courseId= Number(req.params.id);
        const quizzes= await quizService.getQuizzesByCourse(courseId);
        res.status(200).json(quizzes);
      } catch (error) {
        res.status(500).json({ error: "Error fetching quizzes" });
      }
    }

    async addQuestionToQuiz(req: Request, res: Response) {
      try {
        const quizId = Number(req.params.id);
        const questionData = req.body;
        const question = await quizService.addQuestionToQuiz(quizId, questionData);
        res.status(201).json(question);
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }

  async submitQuiz(req: Request, res: Response) {
    try {
      const quizId = Number(req.params.id);
      const userId = Number(req.body.userId);
      const answers = req.body.answers;
      const result = await quizService.submitQuiz(quizId, userId, answers);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

