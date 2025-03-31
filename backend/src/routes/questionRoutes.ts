import { Router } from "express"
import { QuestionController } from "../controllers/questionController"


const questionController= new QuestionController()

const router= Router()

router.post('/',questionController.createQuestion)
router.get('/:id',questionController.getQuestionById)
router.get('/',questionController.getAllQuestions)
router.put('/:id',questionController.updateQuestion)
router.delete('/:id',questionController.deleteQuestion)

export {router as questionRoutes}