import { Router } from "express";
import { EnrollmentController } from "../controllers/enrollmentController";
import {
  authenticateUser,
  authorizeEnrollmentOwnerOrAdmin,
  authorizeRole,
} from "../middleware/middleware";
import { validateBody, validateIdParam } from "../middleware/requestValidation";

const enrollController = new EnrollmentController();

const router = Router();
router.param("id", validateIdParam());
router.param("courseId", validateIdParam("courseId"));

router.get("/manage", authenticateUser, authorizeRole(["admin", "teacher"]), enrollController.getManageEnrollments);
router.post("/", authenticateUser, validateBody({
  courseId: { type: "integer", required: true, min: 1 },
}), enrollController.createEnrollment);
router.get("/me", authenticateUser, enrollController.getMyEnrollments);
router.get("/:id", authenticateUser, authorizeEnrollmentOwnerOrAdmin, enrollController.getEnrollmentById);
router.get('/receipt/:courseId', authenticateUser, enrollController.downloadEnrollReceipt)
router.get("/", authenticateUser, authorizeRole(["admin"]), enrollController.getAllEnrollments);
router.patch("/:id", authenticateUser, authorizeRole(["admin"]), validateBody({
  status: { type: "string", required: true, enum: ["in_progress", "completed"] },
}), enrollController.updateEnrollment);
router.delete("/:id", authenticateUser, authorizeEnrollmentOwnerOrAdmin, enrollController.deleteEnrollment);

export { router as enrollRoutes };
