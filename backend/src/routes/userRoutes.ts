import { Router } from "express"
import { UserController } from "../controllers/userController"
import { upload } from "../middleware/multer"
import { authenticateUser, authorizeRole, authorizeUserSelfOrAdmin } from "../middleware/middleware"
import { validateBody, validateIdParam } from "../middleware/requestValidation"


const userController= new UserController()

const router= Router()
router.param("id", validateIdParam());

router.get('/:id',authenticateUser,authorizeUserSelfOrAdmin,userController.getUserById)
router.get('/',authenticateUser,authorizeRole(["admin"]),userController.getAllUsers)
router.put('/:id',authenticateUser,authorizeUserSelfOrAdmin,upload.single('profilePicture'),validateBody({
  name: { type: "string" },
  email: { type: "email" },
  password: { type: "string" },
  bio: { type: "string" },
}),userController.updateUser)
router.delete('/:id',authenticateUser,authorizeRole(["admin"]),userController.deleteUser)
// router.post('/:id/upload-profile-picture', upload.single('file'), userController.uploadProfilePicture);


export {router as userRoutes}