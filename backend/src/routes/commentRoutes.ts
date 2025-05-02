import { Router } from "express"
import { CommentController } from "../controllers/commentController"
import { authenticateUser } from "../middleware/middleware"


const commentController= new CommentController()

const router= Router()

router.post('/',authenticateUser,commentController.createComment)
router.get('/:id',authenticateUser,commentController.getCommentById)
router.get('/',authenticateUser,commentController.getAllComments)
router.put('/:id',authenticateUser,commentController.updateComment)
router.get('/course/:id',authenticateUser,commentController.getCommentyCourseId)
router.put('/:id',authenticateUser,commentController.deleteComment)

export {router as commentRoutes}