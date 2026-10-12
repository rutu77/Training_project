const assert = require("node:assert/strict");
const test = require("node:test");
const { toQuizResponse } = require("../src/utils/quizResponse");
const { toProgressResponse } = require("../src/utils/progressResponse");

const quiz = {
  id: 4,
  title: "HTTP basics",
  deleted: false,
  course: {
    id: 9,
    title: "Web development",
    creator: {
      id: 2,
      name: "Course creator",
      email: "private@example.com",
      password: "never-serialize",
    },
  },
  questions: [{
    id: 11,
    question: "Which protocol?",
    options: ["HTTP", "FTP"],
    correctAnswer: "HTTP",
    explanation: "HTTP transfers web resources.",
    deleted: false,
  }],
};

test("learner quiz response excludes answer keys and private creator fields", () => {
  const response = toQuizResponse(quiz, { id: 7, role: "user" });
  assert.equal(response.questions[0].correctAnswer, undefined);
  assert.equal(response.questions[0].explanation, undefined);
  assert.deepEqual(response.course.creator, { id: 2, name: "Course creator" });
  assert.equal("email" in response.course.creator, false);
  assert.equal("password" in response.course.creator, false);
});

test("course owner and admin quiz responses include answer keys", () => {
  for (const user of [
    { id: 2, role: "teacher" },
    { id: 99, role: "admin" },
  ]) {
    const response = toQuizResponse(quiz, user);
    assert.equal(response.questions[0].correctAnswer, "HTTP");
    assert.equal(response.questions[0].explanation, "HTTP transfers web resources.");
  }
});

test("progress response projects user and quiz to safe summaries", () => {
  const response = toProgressResponse({
    id: 5,
    score: 80,
    total: 5,
    attempt: 2,
    completion: new Date("2026-01-01T00:00:00.000Z"),
    deleted: false,
    user: { id: 7, name: "Student", email: "private@example.com" },
    quiz: { id: 4, title: "HTTP basics" },
  });

  assert.deepEqual(response.user, { id: 7, name: "Student" });
  assert.deepEqual(response.quiz, { id: 4, title: "HTTP basics" });
  assert.equal("email" in response.user, false);
});
