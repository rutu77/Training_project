import { Router } from "express"
import { UserController } from "../controllers/userController"
import { upload } from "../middleware/multer"




const userController= new UserController()

const router= Router()

router.get('/:id',userController.getUserById)
router.get('/',userController.getAllUsers)
router.put('/:id',upload.single('profilePicture'),userController.updateUser)
router.put('/:id',userController.deleteUser)
// router.post('/:id/upload-profile-picture', upload.single('file'), userController.uploadProfilePicture);


export {router as userRoutes}