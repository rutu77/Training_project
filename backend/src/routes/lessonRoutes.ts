import { Router } from "express"
import { LessonController } from "../controllers/lessonController"


const lessonController= new LessonController()

const router= Router()

router.post('/',lessonController.createLesson)
router.get('/:id',lessonController.getLessonById)
router.get('/',lessonController.getAllLesson)
router.put('/:id',lessonController.updateLesson)
router.delete('/:id',lessonController.deleteLesson)

export {router as lessonRoutes}