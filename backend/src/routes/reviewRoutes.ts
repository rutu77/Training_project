import { Router } from "express";
import { ReviewController } from "../controllers/reviewController";
import {
  authenticateUser,
  authorizeReviewOwnerOrAdmin,
} from "../middleware/middleware";
import { validateBody, validateIdParam } from "../middleware/requestValidation";

const reviewController = new ReviewController();

const router = Router();
router.param("id", validateIdParam());

router.post("/", authenticateUser, validateBody({
  courseId: { type: "integer", required: true, min: 1 },
  rating: { type: "integer", required: true, min: 1, max: 5 },
  comment: { type: "string" },
}), reviewController.createReview);
router.get("/course/:id", reviewController.getReviewByCourseId);
router.get("/", reviewController.getAllReviews);
router.get("/:id", reviewController.getReviewById);
router.put("/:id", authenticateUser, authorizeReviewOwnerOrAdmin, validateBody({
  rating: { type: "integer", min: 1, max: 5 },
  comment: { type: "string" },
}), reviewController.updateReview);
router.delete("/:id", authenticateUser, authorizeReviewOwnerOrAdmin, reviewController.deleteReview);
// router.get('/rating/:id',reviewController.getMeanRatings)

export { router as reviewRoutes };
