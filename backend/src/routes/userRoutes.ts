import { Router } from "express"
import { UserController } from "../controllers/userController"


const userController= new UserController()

const router= Router()

router.get('/:id',)

export {router as userRoutes}