import { Router } from "express"
import { UserController } from "../controllers/userController"
const upload = require("../middleware/multer")



const userController= new UserController()

const router= Router()

router.get('/:id',userController.getUserById)
router.get('/',userController.getAllUsers)
router.put('/:id',userController.updateUser)
router.delete('/:id',userController.deleteUser)
router.post('/:id/upload-profile-picture', upload.single('file'), userController.uploadProfilePicture);


export {router as userRoutes}