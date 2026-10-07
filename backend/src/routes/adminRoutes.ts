import { Router } from "express"
import { AdminController } from "../controllers/adminController"
import { authenticateUser, authorizeRole } from "../middleware/middleware"
import { validateBody } from "../middleware/requestValidation"

const adminController= new AdminController()

const router=Router()

router.post('/updateRole',authenticateUser,authorizeRole(["admin"]),validateBody({
  email: { type: "email", required: true },
  newRole: { type: "string", required: true, enum: ["user", "teacher", "admin"] },
}),adminController.updateRole)

router.post('/AdminRegister',validateBody({
  name: { type: "string", required: true, minLength: 3, maxLength: 100 },
  email: { type: "email", required: true },
  password: { type: "string", required: true, minLength: 8 },
  secretKey: { type: "string", required: true, minLength: 1 },
}),adminController.registerAdmin)

export {router as adminRoutes}