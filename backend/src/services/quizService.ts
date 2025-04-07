import { Quiz } from "../models/Quiz";
import { courseRepository } from "../repositories/courseRepository";
import { quizRepository } from "../repositories/quizRepository";


export class QuizService {
  async createQuiz(quizData: Partial<Quiz>){
    const course= await courseRepository.findOneBy({id:quizData.course?.id});
    if(!course) throw new Error("Course not found!")

    const quiz = quizRepository.create(quizData);
    // const quiz= new Quiz()
    // quiz.course=course
    // quiz.questions=[];
    return await quizRepository.save(quiz);
  }

  async getQuizById(id: number){
    const quiz = await quizRepository.findOne({where:{id}});
    if (!quiz) throw new Error("Quiz not found!");
    return quiz;
  }

  async updateQuizById(id: number, data: Partial<Quiz>){
    await quizRepository.update(id, data);
    const updatedQuiz = await quizRepository.findOne({where:{id}});
    if (!updatedQuiz) throw new Error("Quiz not found!");
    return updatedQuiz;
  }

  async deleteQuiz(id: number): Promise<void> {
    const result = await quizRepository.delete(id);
    if (result.affected === 0) throw new Error("Quiz not found!");
  }

  async getAllQuizzes(): Promise<Quiz[]> {
    return await quizRepository.find();
  }

  async getQuizzesByCourse(courseId:number){
    return await quizRepository.find({where:{course:{id:courseId}}, relations:['questions']});
  }
}