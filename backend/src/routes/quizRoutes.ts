import { Router } from "express"
import { QuizController } from "../controllers/quizController"
import {
  authenticateUser,
  authorizeQuizCourseOwnerOrAdmin,
} from "../middleware/middleware"
import { validateBody, validateIdParam } from "../middleware/requestValidation"


const quizController= new QuizController()

const router= Router()
router.param("id", validateIdParam());

router.post('/',authenticateUser,validateBody({
  courseId: { type: "integer", required: true, min: 1 },
  title: { type: "string", required: true },
}),quizController.createQuiz)
router.get('/:id',authenticateUser,quizController.getQuizById)
router.get('/',authenticateUser,quizController.getAllQuizzes)
router.put('/:id',authenticateUser,authorizeQuizCourseOwnerOrAdmin,validateBody({
  title: { type: "string", required: true },
}),quizController.updateQuiz)
router.delete('/:id',authenticateUser,authorizeQuizCourseOwnerOrAdmin,quizController.deleteQuiz)
router.get('/course/:id',authenticateUser,quizController.getQuizzesByCourse)
router.post('/addQ/:id',authenticateUser,authorizeQuizCourseOwnerOrAdmin,validateBody({
  question: { type: "string", required: true },
  options: { type: "array", required: true },
  correctAnswer: { type: "string", required: true },
  explanation: { type: "string" },
}),quizController.addQuestionToQuiz)
router.post('/submit/:id',authenticateUser,validateBody({
  answers: { type: "object", required: true },
}),quizController.submitQuiz)


export {router as quizRoutes}