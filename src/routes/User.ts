import { Router } from "express"
import UserController from "../controllers/user"

const UserRouter: Router = Router()

UserRouter.get("/profile", UserController.getUserProfile)

export default UserRouter