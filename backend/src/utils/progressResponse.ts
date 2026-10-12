import { Progress } from "../models/Progress";

export function toProgressResponse(progress: Progress) {
  return {
    id: progress.id,
    score: progress.score,
    total: progress.total,
    attempt: progress.attempt,
    completion: progress.completion,
    deleted: progress.deleted,
    user: progress.user
      ? { id: progress.user.id, name: progress.user.name }
      : null,
    quiz: progress.quiz
      ? { id: progress.quiz.id, title: progress.quiz.title }
      : null,
  };
}
