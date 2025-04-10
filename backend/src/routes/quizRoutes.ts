import { Router } from "express"
import { QuizController } from "../controllers/quizController"


const quizController= new QuizController()

const router= Router()

router.post('/',quizController.createQuiz)
router.get('/:id',quizController.getQuizById)
router.get('/',quizController.getAllQuizzes)
router.put('/:id',quizController.updateQuiz)
router.delete('/:id',quizController.deleteQuiz)
router.get('/course/:id',quizController.getQuizzesByCourse)
router.post('/addQ/:id',quizController.addQuestionToQuiz)
router.post('/submit/:id',quizController.submitQuiz)


export {router as quizRoutes}