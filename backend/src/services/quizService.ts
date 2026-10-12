import { Course } from "../models/Course";
import { Quiz } from "../models/Quiz";
import { QuestionRepository } from "../repositories/questionRepository";
import { courseRepository } from "../repositories/courseRepository";
import { progressRepository } from "../repositories/progressRepository";
import { quizRepository } from "../repositories/quizRepository";
import { User } from "../models/User";

export class QuizService {
  async createQuiz(quizData: {
    courseId: number;
    title: string;
  }, user: User) {
    const course = (await courseRepository.findOne({
      where: { id: quizData.courseId },
      relations: ["creator"],
    })) as Course;
    if (!course) throw new Error("Course not found!");

    if (user.role !== "admin" && course.creator.id !== user.id) {
      throw new Error("You can only create quiz on courses you have created");
    }

    const quiz = quizRepository.create({
      title: quizData.title,
      course,
    });
    return await quizRepository.save(quiz);
  }

  async getQuizById(id: number) {
    const quiz = await quizRepository.findOne({
      where: { id, deleted: false },
      relations: ["course", "course.creator", "questions"],
    });

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
    const result = await quizRepository.update(id, { deleted: true });
    if (result.affected === 0) throw new Error("Quiz not found!");
  }

  async getAllQuizzes() {
    return await quizRepository
      .createQueryBuilder("quiz")
      .leftJoinAndSelect("quiz.course", "course")
      .leftJoinAndSelect("course.creator", "creator")
      .leftJoinAndSelect("quiz.questions", "questions")
      .where("quiz.deleted = false")
      .getMany();
  }

  async getQuizzesByCourse(courseId: number) {
    return await quizRepository
      .createQueryBuilder("quiz")
      .leftJoinAndSelect("quiz.course", "course")
      .leftJoinAndSelect("course.creator", "creator")
      .leftJoinAndSelect("quiz.questions", "questions")
      .where("course.id = :courseId", { courseId })
      .andWhere("quiz.deleted = false")
      .getMany();
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
    if (
      typeof questionData.question !== "string" ||
      !questionData.question.trim() ||
      !Array.isArray(questionData.options) ||
      questionData.options.length < 2 ||
      questionData.options.some((option) => typeof option !== "string" || !option.trim()) ||
      typeof questionData.correctAnswer !== "string" ||
      !questionData.options.some((option) => option.trim() === questionData.correctAnswer.trim())
    ) {
      throw new Error("A question, at least two options, and a matching correct answer are required");
    }
    const quiz = await quizRepository.findOne({
      where: { id: id },
      relations: ["course", "questions"],
    });
    if (!quiz) throw new Error("Quiz not found!");

    const question = QuestionRepository.create({
      question: questionData.question.trim(),
      options: questionData.options.map((option) => option.trim()),
      correctAnswer: questionData.correctAnswer.trim(),
      explanation: questionData.explanation,
      quiz,
    });
    return await QuestionRepository.save(question);
  }

  async submitQuiz(quizId: number, userId: number, answers: unknown) {
    const quiz = await quizRepository.findOne({
      where: { id: quizId },
      relations: ["questions"],
    });
    if (!quiz) throw new Error("Quiz not found!");
    if (quiz.deleted) throw new Error("Quiz not found!");
    if (quiz.questions.length === 0) throw new Error("This quiz has no questions");
    if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
      throw new Error("Answers must be an object keyed by question ID");
    }
    const submittedAnswers = answers as Record<string, unknown>;

    let existingProgress = await progressRepository.findOne({
      where: { user: { id: userId }, quiz: { id: quizId } },
    });

    let correctAnswers = 0;
    quiz.questions.forEach((question) => {
      if (submittedAnswers[String(question.id)] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / quiz.questions.length) * 100;

    const total = quiz.questions.length;

    if (existingProgress) {
      if (existingProgress.attempt >= 3) {
        throw new Error("Sorry! Maximum attempt limit reached");
      }
      existingProgress.attempt += 1;
      existingProgress.score = score;
      existingProgress.total = total;
      existingProgress.completion = new Date();
      return progressRepository.save(existingProgress);
    } else {
      const progress = progressRepository.create({
        user: { id: userId },
        quiz,
        score,
        total,
        completion: new Date(),
        attempt: 1,
      });
      return await progressRepository.save(progress);
    }
  }
}
