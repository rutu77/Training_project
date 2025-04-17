import { Router } from "express"
import {AuthController} from "../controllers/authController"
import { authenticateUser } from "../middleware/middleware";

const authController= new AuthController()

const router=Router()

router.post('/register',authController.Register);

router.post('/login',authController.login)


export {router as authRoutes}

