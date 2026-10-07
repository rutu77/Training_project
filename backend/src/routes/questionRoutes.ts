import { Router } from "express"
import { QuestionController } from "../controllers/questionController"
import {
  authenticateUser,
  authorizeQuestionOwnerOrAdmin,
  authorizeQuizOwnerOrAdminFromBody,
  authorizeRole,
} from "../middleware/middleware"
import { validateBody, validateIdParam } from "../middleware/requestValidation"


const questionController= new QuestionController()

const router= Router()
router.param("id", validateIdParam());

router.post('/',authenticateUser,validateBody({
  quizId: { type: "integer", required: true, min: 1 },
  question: { type: "string", required: true },
  options: { type: "array", required: true },
  correctAnswer: { type: "string", required: true },
}),authorizeQuizOwnerOrAdminFromBody,questionController.createQuestion)
router.get('/:id',authenticateUser,authorizeQuestionOwnerOrAdmin,questionController.getQuestionById)
router.get('/',authenticateUser,authorizeRole(["admin"]),questionController.getAllQuestions)
router.put('/:id',authenticateUser,authorizeQuestionOwnerOrAdmin,validateBody({
  question: { type: "string" },
  options: { type: "array" },
  correctAnswer: { type: "string" },
  explanation: { type: "string" },
}),questionController.updateQuestion)
router.delete('/:id',authenticateUser,authorizeQuestionOwnerOrAdmin,questionController.deleteQuestion)
router.get('/quiz/:id',authenticateUser,questionController.getQuestionsByQuiz)

export {router as questionRoutes}