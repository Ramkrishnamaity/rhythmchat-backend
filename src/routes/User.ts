import { Router } from "express"
import UserProfileController from "../controllers/user/Profile"
import { upload } from "../lib/utils/Multer"
import UploadController from "../controllers/common/Upload"

const UserRouter: Router = Router()

// upload apis
UserRouter.post("/file/upload", upload.single("file"), UploadController.fileUpload)
UserRouter.post("/story/upload", upload.single("story"), UploadController.storyUpload)

// profile apis
UserRouter.get("/profile", UserProfileController.getUserProfile)
UserRouter.put("/profile", UserProfileController.updateProfile)
UserRouter.put('/change-password', UserProfileController.updatePassword)
UserRouter.delete('/account', UserProfileController.deleteAccount)


export default UserRouter