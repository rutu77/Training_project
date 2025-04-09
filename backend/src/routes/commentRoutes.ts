import { Router } from "express"
import { CommentController } from "../controllers/commentController"


const commentController= new CommentController()

const router= Router()

router.post('/',commentController.createComment)
router.get('/:id',commentController.getCommentById)
router.get('/',commentController.getAllComments)
router.put('/:id',commentController.updateComment)
router.get('/course/:id',commentController.getCommentyCourseId)
router.put('/:id',commentController.deleteComment)

export {router as commentRoutes}