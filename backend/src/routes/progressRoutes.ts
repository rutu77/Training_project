import { Router } from "express"
import { ProgressController } from "../controllers/progressController"
import {
  authenticateUser,
  authorizeProgressOwnerOrAdmin,
  authorizeRole,
  authorizeUserSelfOrAdminForParam,
} from "../middleware/middleware"
import { validateIdParam } from "../middleware/requestValidation"


const progressController= new ProgressController()

const router= Router()
router.param("id", validateIdParam());

router.get('/manage',authenticateUser,authorizeRole(["admin", "teacher"]),progressController.getManageProgress)
router.get('/:id',authenticateUser,authorizeProgressOwnerOrAdmin,progressController.getprogressById)
router.get('/user/:id',authenticateUser,authorizeUserSelfOrAdminForParam,progressController.getProgressByUser)
router.get('/report/:id',authenticateUser,authorizeUserSelfOrAdminForParam,progressController.downloadProgressReport)
router.get('/',authenticateUser,authorizeRole(["admin"]),progressController.getAllprogresss)
router.delete('/:id',authenticateUser,authorizeRole(["admin"]),progressController.deleteprogress)

export {router as progressRoutes}