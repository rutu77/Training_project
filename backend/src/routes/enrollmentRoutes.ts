import { Router } from "express";
import { EnrollmentController } from "../controllers/enrollmentController";

const enrollController = new EnrollmentController();

const router = Router();

router.post("/", enrollController.createEnrollment);
router.get("/:id", enrollController.getEnrollmentById);
router.get('/receipt/:id/:cid', enrollController.downloadEnrollReceipt)
router.get("/", enrollController.getAllEnrollments);
router.put("/:id", enrollController.deleteEnrollment);
router.put("/:id", enrollController.updateEnrollment);

export { router as enrollRoutes };
