import { Request, Response } from "express";
import { QuizService } from "../services/quizService";
import { Quiz } from "../models/Quiz";


export class QuizController{
    quizService = new QuizService();

    async createQuiz(req: Request, res: Response){
      const quizData: Partial<Quiz> = req.body;
      try {
        const quiz = await this.quizService.createQuiz(quizData);
        res.status(201).json({ message: "Quiz created successfully!", data: quiz });
      } catch (error) {
        res.status(500).json({ error: "Error creating enrollment" });
      }
    }
    
    async getQuizById(req: Request, res: Response): Promise<void> {
      const quizId = Number(req.params.id);
      try {
        const quiz = await this.quizService.getQuizById(quizId);
        res.status(200).json({ data: quiz });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async updateQuiz(req: Request, res: Response): Promise<void> {
      const quizId = Number(req.params.id);
      const data = req.body;
      try {
        const updatedQuiz = await this.quizService.updateQuizById(quizId, data);
        res.status(200).json({message:"Quiz updated successfully", data: updatedQuiz });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async deleteQuiz(req: Request, res: Response): Promise<void> {
      const quizId = Number(req.params.id);
      try {
        await this.quizService.deleteQuiz(quizId);
        res.status(200).json({ message: "Quiz deleted successfully!" });
      } catch (error) {
        res.status(404).json({ message: (error as Error).message });
      }
    }
  
    async getAllQuizzes(req: Request, res: Response): Promise<void> {
      try {
        const quizzes = await this.quizService.getAllQuizzes();
        res.status(200).json(quizzes);
      } catch (error) {
        res.status(500).json({ error: "Error fetching quizzes" });
      }
    }
  }