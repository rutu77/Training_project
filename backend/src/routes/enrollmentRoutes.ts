import { Router } from "express"
import { EnrollmentController } from "../controllers/enrollmentController"


const enrollController= new EnrollmentController

const router= Router()

router.post('/',enrollController.createEnrollment)
router.get('/:id',enrollController.getEnrollmentById)
router.get('/',enrollController.getAllEnrollments)
router.put('/:id',enrollController.updateEnrollment)
router.put('/:id',enrollController.deleteEnrollment)


export {router as enrollRoutes}