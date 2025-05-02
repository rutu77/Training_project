import { Router } from "express"
import { QuestionController } from "../controllers/questionController"
import { authenticateUser } from "../middleware/middleware"


const questionController= new QuestionController()

const router= Router()

router.post('/',authenticateUser,questionController.createQuestion)
router.get('/:id',authenticateUser,questionController.getQuestionById)
router.get('/',authenticateUser,questionController.getAllQuestions)
router.put('/:id',authenticateUser,questionController.updateQuestion)
router.delete('/:id',authenticateUser,questionController.deleteQuestion)
router.get('/quiz/:id',authenticateUser,questionController.getQuestionsByQuiz)

export {router as questionRoutes}