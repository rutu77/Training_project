import { Router } from "express"
import { AdminController } from "../controllers/adminController"
import { authenticateUser, authorizeRole } from "../middleware/middleware"

const adminController= new AdminController()

const router=Router()

router.put('/updateRole',adminController.updateRole)

router.post('/AdminRegister',adminController.registerAdmin)

export {router as adminRoutes}