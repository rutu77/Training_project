import { Router } from "express"
import { AdminController } from "../controllers/adminController"

const adminController= new AdminController()

const router=Router()

router.post('/updateRole',adminController.updateRole)

router.post('/AdminRegister',adminController.registerAdmin)

export {router as adminRoutes}