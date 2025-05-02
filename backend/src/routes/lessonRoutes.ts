import { Router } from "express"
import { LessonController } from "../controllers/lessonController"
import { authenticateUser } from "../middleware/middleware"


const lessonController= new LessonController()

const router= Router()

router.post('/:id',authenticateUser,lessonController.createLesson)
router.get('/:id',authenticateUser,lessonController.getLessonById)
router.get('/',authenticateUser,lessonController.getAllLesson)
router.put('/:id',authenticateUser,lessonController.updateLesson)
router.get('/course/:id',authenticateUser,lessonController.getLessonByCourseId)
router.put('/:id',authenticateUser,lessonController.deleteLesson)



export {router as lessonRoutes}