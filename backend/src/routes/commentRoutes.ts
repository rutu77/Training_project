import { Router } from "express"
import { CommentController } from "../controllers/commentController"
import { authenticateUser, authorizeCommentOwnerOrAdmin, authorizeRole } from "../middleware/middleware"
import { validateBody, validateIdParam } from "../middleware/requestValidation"


const commentController= new CommentController()

const router= Router()
router.param("id", validateIdParam());

router.post('/',authenticateUser,validateBody({
  courseId: { type: "integer", required: true, min: 1 },
  message: { type: "string", required: true },
}),commentController.createComment)
router.get('/:id',authenticateUser,commentController.getCommentById)
router.get('/',authenticateUser,authorizeRole(["admin"]),commentController.getAllComments)
router.put('/:id',authenticateUser,authorizeCommentOwnerOrAdmin,validateBody({
  message: { type: "string", required: true },
}),commentController.updateComment)
router.get('/course/:id',authenticateUser,commentController.getCommentyCourseId)
router.delete('/:id',authenticateUser,authorizeCommentOwnerOrAdmin,commentController.deleteComment)

export {router as commentRoutes}