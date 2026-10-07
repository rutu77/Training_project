import { Router } from "express"
import { CourseController } from "../controllers/courseController"
import { upload } from "../middleware/multer"
import {
  authenticateUser,
  authorizeCourseOwnerOrAdmin,
  authorizeRole,
} from "../middleware/middleware"
import { validateBody, validateIdParam } from "../middleware/requestValidation"


const courseController= new CourseController()

const router= Router()
router.param("id", validateIdParam());

router.post('/',authenticateUser,authorizeRole(["admin", "teacher"]),upload.single('thumbnail'),validateBody({
  title: { type: "string", required: true },
  description: { type: "string", required: true },
  price: { type: "number", required: true, min: 0 },
  duration: { type: "integer", required: true, min: 0 },
  level: { type: "string", required: true, enum: ["beginner", "intermediate", "advanced"] },
  isPublished: { type: "boolean" },
}),courseController.createCourse)
router.get('/:id',courseController.getCourseById)
router.get('/',courseController.getAllCourses)
router.put('/:id',authenticateUser,authorizeCourseOwnerOrAdmin,validateBody({
  title: { type: "string" },
  description: { type: "string" },
  price: { type: "number", min: 0 },
  duration: { type: "integer", min: 0 },
  level: { type: "string", enum: ["beginner", "intermediate", "advanced"] },
  isPublished: { type: "boolean" },
}),courseController.updateCourse)
router.delete('/delete/:id',authenticateUser,authorizeCourseOwnerOrAdmin,courseController.deleteTheCourse)
// router.get('/search',courseController.getSearchCourses)


export {router as courseRoutes}