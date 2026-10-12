import { Request, Response } from "express";
import { QuizService } from "../services/quizService";
import { AuthRequest } from "../types/authRequest";
import { toQuizResponse } from "../utils/quizResponse";

const quizService = new QuizService();

export class QuizController {
  async createQuiz(req: Request, res: Response) {
    const user = (req as AuthRequest).user;
    const courseId = Number(req.body.courseId);
    const { title } = req.body;
    if (!user) {
      res.status(401).json({ message: "Authentication is required" });
      return;
    }
    if (!Number.isInteger(courseId) || courseId <= 0 || typeof title !== "string" || !title.trim()) {
      res.status(400).json({ message: "A valid course ID and quiz title are required" });
      return;
    }

    try {
      const quiz = await quizService.createQuiz({ courseId, title: title.trim() }, user);
      res
        .status(201)
        .json({ message: "Quiz created successfully!", data: toQuizResponse(quiz, user) });
    } catch (error) {
      const message = (error as Error).message;
      const status = message === "Course not found!" ? 404 : message.startsWith("You can only") ? 403 : 500;
      res.status(status).json({ message });
    }
  }

  async getQuizById(req: Request, res: Response) {
    const quizId = Number(req.params.id);
    try {
      const quiz = await quizService.getQuizById(quizId);
      res.status(200).json({ data: toQuizResponse(quiz, (req as AuthRequest).user) });
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async updateQuiz(req: Request, res: Response) {
    const quizId = Number(req.params.id);
    const { title } = req.body;
    if (typeof title !== "string" || !title.trim()) {
      res.status(400).json({ message: "Quiz title is required" });
      return;
    }
    try {
      const updatedQuiz = await quizService.updateQuizById(quizId, { title: title.trim() });
      res
        .status(200)
        .json({ message: "Quiz updated successfully", data: toQuizResponse(updatedQuiz, (req as AuthRequest).user) });
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async deleteQuiz(req: Request, res: Response) {
    const quizId = Number(req.params.id);
    try {
      await quizService.deleteQuiz(quizId);
      res.status(200).json({ message: "Quiz deleted successfully!" });
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async getAllQuizzes(req: Request, res: Response) {
    try {
      const quizzes = await quizService.getAllQuizzes();
      res.status(200).json(quizzes.map((quiz) => toQuizResponse(quiz, (req as AuthRequest).user)));
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      res.status(500).json({ error: "Error fetching quizzes" });
    }
  }

  async getQuizzesByCourse(req: Request, res: Response) {
    try {
      const courseId = Number(req.params.id);
      const quizzes = await quizService.getQuizzesByCourse(courseId);
      res.status(200).json(quizzes.map((quiz) => toQuizResponse(quiz, (req as AuthRequest).user)));
    } catch (error) {
      console.error("Error fetching quizzes for course:", error);
      res.status(500).json({ error: "Error fetching quizzes" });
    }
  }

  async addQuestionToQuiz(req: Request, res: Response) {
    try {
      const quizId = Number(req.params.id);
      const questionData = req.body;
      const question = await quizService.addQuestionToQuiz(
        quizId,
        questionData
      );
      res.status(201).json(question);
    } catch (error) {
      res.status(404).json({ message: (error as Error).message });
    }
  }

  async submitQuiz(req: Request, res: Response) {
    const user = (req as AuthRequest).user;
    if (!user) {
      res.status(401).json({ message: "Authentication is required" });
      return;
    }
    try {
      const quizId = Number(req.params.id);
      const answers = req.body.answers;
      if (!Number.isInteger(quizId) || quizId <= 0) {
        res.status(400).json({ message: "Invalid quiz ID" });
        return;
      }
      const result = await quizService.submitQuiz(quizId, user.id, answers);
      res.status(200).json({
        score: result.score,
        total: result.total,
        attempt: result.attempt,
        completion: result.completion,
      });
    } catch (error) {
      const message = (error as Error).message;
      res.status(message === "Quiz not found!" ? 404 : 400).json({ message });
    }
  }
}
