import { Router } from "express"
import { AdminController } from "../controllers/adminController"
import { authenticateUser, authorizeRole } from "../middleware/middleware"
import { validateBody, validateIdParam } from "../middleware/requestValidation"

const adminController= new AdminController()

const router=Router()

router.get('/teacher-requests',authenticateUser,authorizeRole(["admin"]),adminController.getPendingTeacherRequests)

router.patch('/teacher-requests/:id',authenticateUser,authorizeRole(["admin"]),validateIdParam(),validateBody({
  decision: { type: "string", required: true, enum: ["approved", "rejected"] },
}),adminController.reviewTeacherRequest)

router.post('/updateRole',authenticateUser,authorizeRole(["admin"]),validateBody({
  email: { type: "email", required: true },
  newRole: { type: "string", required: true, enum: ["user", "teacher", "admin"] },
}),adminController.updateRole)

export {router as adminRoutes}