import { Router } from "express"
import { CourseController } from "../controllers/courseController"


const courseController= new CourseController()

const router= Router()

router.post('/',courseController.createCourse)
router.get('/:id',courseController.getCourseById)
router.get('/',courseController.getAllCourses)
router.put('/:id',courseController.updateCourse)
router.delete('/:id',courseController.deleteCourse)

export {router as courseRoutes}