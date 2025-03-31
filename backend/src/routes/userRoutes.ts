import { Router } from "express"
import { UserController } from "../controllers/userController"


const userController= new UserController()

const router= Router()

router.get('/:id',userController.getUserById)
router.get('/',userController.getAllUsers)
router.put('/:id',userController.updateUser)
router.delete('/:id',userController.deleteUser)

export {router as userRoutes}