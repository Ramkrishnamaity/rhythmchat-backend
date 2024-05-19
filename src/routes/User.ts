import { Router } from "express"
import UserProfileController from "../controllers/user/Profile"
import UserDashboardController from "../controllers/user/Dashboard"

const UserRouter: Router = Router()


UserRouter.get("/profile/:id", UserProfileController.getUserProfile)
UserRouter.get("/dashboard/:id", UserDashboardController.getDashBoardData)


export default UserRouter