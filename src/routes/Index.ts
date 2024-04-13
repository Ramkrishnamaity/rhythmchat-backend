import { Router } from "express"
import UserAuthController from "../controllers/auth/User"
import { middleware } from "../lib/utils/Middleware"
import UserRouter from "./User"

const ApiRoute: Router = Router()

ApiRoute.post("/user/login/:id", UserAuthController.login)
ApiRoute.post("/user/register", UserAuthController.register)

ApiRoute.use(middleware)

ApiRoute.use("/user", UserRouter)

export default ApiRoute