import { Router } from "express"
import { CourseController } from "../controllers/courseController"
import { upload } from "../middleware/multer"


const courseController= new CourseController()

const router= Router()

router.post('/',upload.single('thumbnail'),courseController.createCourse)
router.get('/:id',courseController.getCourseById)
router.get('/',courseController.getAllCourses)
router.put('/:id',courseController.updateCourse)
router.put('/:id',courseController.deleteCourse)
router.delete('/delete/:id',courseController.deleteTheCourse)
// router.get('/search',courseController.getSearchCourses)


export {router as courseRoutes}