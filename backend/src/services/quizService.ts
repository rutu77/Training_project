import { Course } from "../models/Course";
import { Progress } from "../models/Progress";
import { Quiz } from "../models/Quiz";
import { QuestionRepository } from "../repositories/attemptRepository";
import { courseRepository } from "../repositories/courseRepository";
import { progressRepository } from "../repositories/progressRepository";
import { quizRepository } from "../repositories/quizRepository";

export class QuizService {
  async createQuiz(quizData: { courseId: number; title: string , userId:number}) {
    const course = (await courseRepository.findOne({
      where: { id: quizData.courseId },
    })) as Course;
    if (!course) throw new Error("Course not found!");
    if(course.creator.id==quizData.userId){
      const quiz = quizRepository.create({ ...quizData, course: course });
      return await quizRepository.save(quiz);
    }
    else{
      throw new Error("You can only create quiz on courses you have created")
    }
  }

  async getQuizById(id: number) {
    const quiz = await quizRepository.findOne({
      where: { id: id },
      relations: ["course", "questions"],
    });
    // const quiz = await quizRepository.findOne({where:{id:id},});
    if (!quiz) throw new Error("Quiz not found!");
    return quiz;
  }

  async updateQuizById(id: number, data: Partial<Quiz>) {
    await quizRepository.update(id, data);
    const updatedQuiz = await quizRepository.findOne({ where: { id } });
    if (!updatedQuiz) throw new Error("Quiz not found!");
    return updatedQuiz;
  }

  async deleteQuiz(id: number) {
    const result = await quizRepository.delete(id);
    if (result.affected === 0) throw new Error("Quiz not found!");
    // await quizRepository.update(id,{deleted:true})
  }

  async getAllQuizzes() {
    return await quizRepository.find({ relations: ["course", "questions"] });
  }

  async getQuizzesByCourse(courseId: number) {
    return await quizRepository.find({
      where: { course: { id: courseId } },
      relations: ["questions"],
    });
  }

  async addQuestionToQuiz(
    id: number,
    questionData: {
      question: string;
      options: string[];
      correctAnswer: string;
      explanation?: string;
    }
  ) {
    const quiz = await quizRepository.findOne({
      where: { id: id },
      relations: ["course", "questions"],
    });
    if (!quiz) throw new Error("Quiz not found!");

    const question = QuestionRepository.create({ ...questionData, quiz });
    return await QuestionRepository.save(question);
  }

  async submitQuiz(
    quizId: number,
    userId: number,
    answers: any
  ): Promise<Progress> {
    const quiz = await quizRepository.findOne({
      where: { id: quizId },
      relations: ["questions"],
    });
    if (!quiz) throw new Error("Quiz not found!");

    let correctAnswers = 0;
    quiz.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / quiz.questions.length) * 100;
    const progress = progressRepository.create({
      user: { id: userId },
      quiz,
      score,
      total: quiz.questions.length,
      completion: new Date(),
    });

    return await progressRepository.save(progress);
  }
}
