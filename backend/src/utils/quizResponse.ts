import { Quiz } from "../models/Quiz";
import { User } from "../models/User";

type QuizViewer = Pick<User, "id" | "role">;

export function toQuizResponse(quiz: Quiz, user?: QuizViewer) {
  const canSeeAnswers =
    user?.role === "admin" || quiz.course?.creator?.id === user?.id;

  return {
    id: quiz.id,
    title: quiz.title,
    deleted: quiz.deleted,
    course: quiz.course
      ? {
          id: quiz.course.id,
          title: quiz.course.title,
          creator: quiz.course.creator
            ? { id: quiz.course.creator.id, name: quiz.course.creator.name }
            : null,
        }
      : null,
    questions: (quiz.questions ?? []).map((question) => {
      const safeQuestion = {
        id: question.id,
        question: question.question,
        options: question.options,
        deleted: question.deleted,
      };
      return canSeeAnswers
        ? {
            ...safeQuestion,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
          }
        : safeQuestion;
    }),
  };
}
