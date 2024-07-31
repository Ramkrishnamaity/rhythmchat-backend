import { Router } from "express"
import UserAuthController from "../controllers/auth/User"
import UserRouter from "./User"
import { middleware } from "../lib/utils/Middleware"
import UploadController from "../controllers/common/Upload"
import multer from "multer"
import {existsSync, mkdirSync} from "fs"


const storage = multer.diskStorage({
	destination(req, file, callback) {
		const uploadFolder1 = `./uploads/${req.User?._id}`
		if(!existsSync(uploadFolder1)) mkdirSync(uploadFolder1)
		const uploadFolder2 = `${uploadFolder1}/${file.fieldname}/`
		if(!existsSync(uploadFolder2)) mkdirSync(uploadFolder2)
		callback(null, uploadFolder2)
	},
	filename(req, file, callback) {
		callback(null, `${Date.now()}-${file.originalname}`)
	},
})
const upload = multer({storage: storage})


const ApiRoute: Router = Router()

// auth apis
ApiRoute.post("/user/login", UserAuthController.login)
ApiRoute.post("/user/register", UserAuthController.register)
ApiRoute.post("/user/otp", UserAuthController.sendOtp)

ApiRoute.use(middleware)

// upload apis
ApiRoute.post("/upload/image", upload.single("image"), UploadController.imageUpload)
ApiRoute.post("/upload/video", upload.single("video"), UploadController.videoUpload)
ApiRoute.post("/upload/story", upload.single("story"), UploadController.storyUpload)

// user apis
ApiRoute.use("/user", UserRouter)


export default ApiRoute