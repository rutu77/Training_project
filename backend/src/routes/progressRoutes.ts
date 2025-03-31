import { Router } from "express"
import { ProgressController } from "../controllers/progressController"


const progressController= new ProgressController()

const router= Router()

router.post('/',progressController.createprogress)
router.get('/:id',progressController.getprogressById)
router.get('/',progressController.getAllprogresss)
router.put('/:id',progressController.updateprogress)
router.delete('/:id',progressController.deleteprogress)

export {router as progressRoutes}