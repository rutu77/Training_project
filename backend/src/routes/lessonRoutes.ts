import { Router } from "express"
import { LessonController } from "../controllers/lessonController"


const lessonController= new LessonController()

const router= Router()

router.post('/:id',lessonController.createLesson)
router.get('/:id',lessonController.getLessonById)
router.get('/',lessonController.getAllLesson)
router.put('/:id',lessonController.updateLesson)
router.get('/course/:id',lessonController.getLessonByCourseId)
router.put('/:id',lessonController.deleteLesson)



export {router as lessonRoutes}