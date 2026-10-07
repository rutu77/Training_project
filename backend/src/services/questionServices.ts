import { Question } from "../models/Question";
import { QuestionRepository } from "../repositories/questionRepository";
import { quizRepository } from "../repositories/quizRepository";

export class QuestionService {
  async createQuestion(QuestionData: Partial<Question>) {
    const quiz = await quizRepository.findOneBy({ id: QuestionData.quiz?.id });
    if (!quiz) throw new Error("Quiz not found!");
    const question = QuestionRepository.create({
      question: QuestionData.question,
      options: QuestionData.options,
      correctAnswer: QuestionData.correctAnswer,
      explanation: QuestionData.explanation,
      quiz,
    });
    return QuestionRepository.save(question);
  }

  async getQuestionById(id: number) {
    const Question = await QuestionRepository.findOne({ where: { id } });
    if (!Question) throw new Error("Question not found!");
    return Question;
  }

  async updateQuestionById(id: number, data: Partial<Question>) {
    const question = await QuestionRepository.findOne({ where: { id } });
    if (!question) throw new Error("Question not found!");
    if (data.question !== undefined) question.question = data.question;
    if (data.options !== undefined) question.options = data.options;
    if (data.correctAnswer !== undefined) question.correctAnswer = data.correctAnswer;
    if (data.explanation !== undefined) question.explanation = data.explanation;
    if (!question.options.some((option) => option.trim() === question.correctAnswer.trim())) {
      throw new Error("Correct answer must match one of the options");
    }
    return QuestionRepository.save(question);
  }

  async deleteQuestion(id: number) {
    const result = await QuestionRepository.delete(id);
    if (result.affected === 0) throw new Error("Question not found!");
    // await QuestionRepository.update(id,{deleted:true})
  }

  async getAllQuestions() {
    return await QuestionRepository.find();
  }

  async getQuestionsByQuiz(quizId: number) {
    return await QuestionRepository.find({
      where: { quiz: { id: quizId } },
      relations: ["quiz", "quiz.course", "quiz.course.creator"],
    });
  }
}
