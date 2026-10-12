import { Router } from "express"
import {AuthController} from "../controllers/authController"
import { validateBody } from "../middleware/requestValidation";
import { loginRateLimit, registrationRateLimit } from "../middleware/rateLimits";

const authController= new AuthController()

const router=Router()

router.post('/register',registrationRateLimit,validateBody({
  name: { type: "string", required: true, minLength: 3, maxLength: 100 },
  email: { type: "email", required: true },
  password: { type: "string", required: true, minLength: 8 },
  requestedRole: { type: "string", enum: ["user", "teacher"] },
}),authController.Register);

router.post('/login',loginRateLimit,validateBody({
  email: { type: "email", required: true },
  password: { type: "string", required: true },
}),authController.login)


export {router as authRoutes}
