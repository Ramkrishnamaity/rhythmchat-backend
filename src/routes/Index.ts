import { Router } from "express"
import UserAuthController from "../controllers/auth/User"
import UserRouter from "./User"
import { middleware } from "../lib/utils/Middleware"

const ApiRoute: Router = Router()

ApiRoute.post("/user/login", UserAuthController.login)
ApiRoute.post("/user/register", UserAuthController.register)
ApiRoute.post("/user/otp", UserAuthController.sendOtp)


ApiRoute.use(middleware)

ApiRoute.use("/user", UserRouter)

export default ApiRoute