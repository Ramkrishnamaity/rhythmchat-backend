import { Router } from "express"
import UserAuthController from "../controllers/auth/User"
import { middleware } from "../lib/utils/Middleware"
import UserRouter from "./User"

const Route: Router = Router()

Route.post("/user/login", UserAuthController.login)
Route.post("/user/register", UserAuthController.register)

Route.use(middleware)

Route.use("/user", UserRouter)

export default Route