import { Router } from "express"
import UserAuthController from "../controllers/auth/User"
import UserRouter from "./User"

const ApiRoute: Router = Router()

ApiRoute.post("/user/login", UserAuthController.login)

ApiRoute.use("/user", UserRouter)

export default ApiRoute