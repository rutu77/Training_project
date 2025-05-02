import { Router } from "express"
import { QuizController } from "../controllers/quizController"
import { authenticateUser } from "../middleware/middleware"


const quizController= new QuizController()

const router= Router()

router.post('/:id',authenticateUser,quizController.createQuiz)
router.get('/:id',authenticateUser,quizController.getQuizById)
router.get('/',authenticateUser,quizController.getAllQuizzes)
router.put('/:id',authenticateUser,quizController.updateQuiz)
router.delete('/:id',authenticateUser,quizController.deleteQuiz)
router.get('/course/:id',authenticateUser,quizController.getQuizzesByCourse)
router.post('/addQ/:id',authenticateUser,quizController.addQuestionToQuiz)
router.post('/submit/:id',authenticateUser,quizController.submitQuiz)


export {router as quizRoutes}