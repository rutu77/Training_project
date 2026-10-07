import { Request ,Response} from "express";
import { QuestionService } from "../services/questionServices";
import { Question } from "../models/Question";
import { AuthRequest } from "../types/authRequest";

const questionService= new QuestionService()


export class QuestionController{

    async createQuestion(req: Request, res: Response){
      const { question, options, correctAnswer, explanation, quizId } = req.body;
      if (typeof question !== "string" || !question.trim() || !Array.isArray(options) ||
          options.length < 2 || options.some((option) => typeof option !== "string") ||
          typeof correctAnswer !== "string" || !correctAnswer.trim() ||
          !options.some((option) => option.trim() === correctAnswer.trim())) {
        res.status(400).json({ message: "A question, at least two options, and a matching correct answer are required" });
        return;
      }
      const QuestionData: Partial<Question> = {
        question: question.trim(),
        options: options.map((option: string) => option.trim()),
        correctAnswer: correctAnswer.trim(),
        explanation,
        quiz: { id: Number(quizId) } as Question["quiz"],
      };
      try {
        const Question = await questionService.createQuestion(QuestionData);
        res.status(201).json({ message: "Question created successfully!", data: Question });
      } catch (error) {
        // res.status(500).json({ error: "Error creating Question" });
        res.status(400).json({ message: (error as Error).message });

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
        const { question, options, correctAnswer, explanation } = req.body;
        const data: Partial<Question> = {};
        if (question !== undefined) {
          if (typeof question !== "string" || !question.trim()) {
            res.status(400).json({ message: "Question text must not be empty" });
            return;
          }
          data.question = question.trim();
        }
        if (options !== undefined) {
          if (!Array.isArray(options) || options.length < 2 || options.some((option) => typeof option !== "string")) {
            res.status(400).json({ message: "At least two text options are required" });
            return;
          }
          data.options = options.map((option: string) => option.trim());
        }
        if (correctAnswer !== undefined) {
          if (typeof correctAnswer !== "string" || !correctAnswer.trim()) {
            res.status(400).json({ message: "Correct answer must not be empty" });
            return;
          }
          data.correctAnswer = correctAnswer.trim();
        }
        if (explanation !== undefined) data.explanation = explanation;
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
        const user = (req as AuthRequest).user;
        const visibleQuestions = questions.map(({ quiz, ...question }) => {
          if (user?.role === "admin" || quiz.course.creator.id === user?.id) return question;
          const { correctAnswer, explanation, ...safeQuestion } = question;
          return safeQuestion;
        });
        res.status(200).json(visibleQuestions);
      } catch (error) {
        res.status(500).json({ error: "Error fetching questions" });
      }
    } 

}