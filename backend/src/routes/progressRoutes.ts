import { Router } from "express"
import { ProgressController } from "../controllers/progressController"


const progressController= new ProgressController()

const router= Router()

router.post('/',progressController.createProgress)
router.get('/:id',progressController.getprogressById)
router.get('/user/:id',progressController.getProgressByUser)
router.get('/report/:id',progressController.downloadProgressReport)
// router.get('/',progressController.getAllprogresss)
// router.put('/:id',progressController.updateprogress)
// router.delete('/:id',progressController.deleteprogress)

export {router as progressRoutes}