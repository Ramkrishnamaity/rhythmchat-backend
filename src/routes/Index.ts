import { Router } from "express"
import UserAuthController from "../controllers/auth/User"
import UserRouter from "./User"

const ApiRoute: Router = Router()

ApiRoute.get("/user/login/:id", UserAuthController.login)

// ApiRoute.use(middleware)

ApiRoute.use("/user", UserRouter)

export default ApiRoute