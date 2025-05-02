import { Router } from "express"
import { ProgressController } from "../controllers/progressController"
import { authenticateUser } from "../middleware/middleware"


const progressController= new ProgressController()

const router= Router()

router.post('/',authenticateUser,progressController.createProgress)
router.get('/:id',authenticateUser,progressController.getprogressById)
router.get('/user/:id',authenticateUser,progressController.getProgressByUser)
router.get('/report/:id',authenticateUser,progressController.downloadProgressReport)
router.get('/',authenticateUser,progressController.getAllprogresss)
router.put('/:id',authenticateUser,progressController.updateprogress)
router.delete('/:id',authenticateUser,progressController.deleteprogress)

export {router as progressRoutes}