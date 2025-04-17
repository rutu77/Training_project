import { Router } from "express"
import { ReviewController } from "../controllers/reviewController"
import { authenticateUser, authorizeRole } from "../middleware/middleware"


const reviewController= new ReviewController()

const router= Router()

router.post('/',reviewController.createReview)
router.get('/:id',reviewController.getReviewById)
router.get('/',reviewController.getAllReviews)
router.put('/:id',authenticateUser,reviewController.updateReview)
router.get('/course/:id',reviewController.getReviewByCourseId)
router.put('/:id',reviewController.deleteReview)
// router.get('/rating/:id',reviewController.getMeanRatings)


export {router as reviewRoutes}




