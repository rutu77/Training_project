import { Question } from "../models/Question";
import { QuestionRepository } from "../repositories/questionRepository";
import { quizRepository } from "../repositories/quizRepository";

export class QuestionService {
  async createQuestion(QuestionData: Partial<Question>) {
    const quiz = await quizRepository.findOneBy({ id: QuestionData.quiz?.id });
    if (!quiz) throw new Error("Quiz not found!");
    const Question = QuestionRepository.create(QuestionData);
    return await QuestionRepository.save(Question);
  }

  async getQuestionById(id: number) {
    const Question = await QuestionRepository.findOne({ where: { id } });
    if (!Question) throw new Error("Question not found!");
    return Question;
  }

  async updateQuestionById(id: number, data: Partial<Question>) {
    await QuestionRepository.update(id, data);
    const updatedQuestion = await QuestionRepository.findOne({ where: { id } });
    if (!updatedQuestion) throw new Error("Question not found!");
    return updatedQuestion;
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
    return await QuestionRepository.find({ where: { quiz: { id: quizId } } });
  }
}
